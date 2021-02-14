import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import {Route, withRouter, Switch, Redirect} from "react-router-dom";
/*import DialogsContainer from "./Components/Dialogs/DialogsContainer";*/
import UsersContainer from "./Components/Users/UsersContainer";
import ProfileContainer from "./Components/Profile/ProfileContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import classes from './Components/Header/Header.module.css';
import LoginContainer from "./Components/Login/LoginContainer";
import {Component} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./Components/common/Preloader/Preloader";
import * as React from "react";

const DialogsContainer = React.lazy(() => import ("./Components/Dialogs/DialogsContainer"))


class App extends Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {

        if (!this.props.initialized) {
            return (<Preloader></Preloader>)
        }
        return (

            <div className='app-wrapper'>
        <span className={classes.header}>
            <HeaderContainer/>
        </span>
                <NavBar/>
                <div className='app-wrapper-content'>
                    <Switch>
                        <Route path="/dialogs" render={() => {
                            return <React.Suspense fallback={<div>loading...</div>}>
                                <DialogsContainer/></React.Suspense>
                        }}/>
                        <Route path="/profile/:userID?" render={() => <ProfileContainer
                        />}/>
                        <Route path="/users" render={() => <UsersContainer/>}/>
                        <Route path='/login' render={() => <LoginContainer/>}/>
                        <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                    </Switch>
                </div>

            </div>
        );
    }


}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})
export default compose(withRouter, connect(mapStateToProps, {
    initializeApp
}))(App);
