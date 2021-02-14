import Profile from "./Profile";
import * as React from "react";
import {connect} from "react-redux";
import {
    getUserStatusThunkCreator,
    setUserProfileThunkCreator,
    postUserStatusThunkCreator,
    savePhotoThunkCreator, saveProfileThunkCreator
} from "../../redux/profile-reducer";
import {withRouter} from "react-router";
import {compose} from "redux";


class ProfileContainer extends React.Component {
    disableStatus = false;

    componentDidMount() {
        this.refreshData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.userID !== this.props.match.params.userID)
            this.refreshData();
    }

    refreshData() {
        let userID = this.props.match.params.userID;
        if (!userID) {
            userID = this.props.id;
            if (!userID) {
                this.props.history.push('/login')
            }
        }
        this.disableStatus = userID != this.props.id ? true : false
        this.props.setUserProfileThunkCreator(userID);
        this.props.getUserStatusThunkCreator(userID);
    }


    render() {
        return <div>
            <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                     postUsersStatus={this.props.postUserStatusThunkCreator}
                     disable={this.disableStatus}
                     isOwner = {!this.props.match.params.userID}
                     savePhoto ={this.props.savePhotoThunkCreator}
                     saveProfile = {this.props.saveProfileThunkCreator}
            />
        </div>
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    id: state.auth.userID,
    isAuth: state.auth.isAuth
})


export default compose(
    connect(mapStateToProps, {
        setUserProfileThunkCreator,
        getUserStatusThunkCreator,
        postUserStatusThunkCreator,
        savePhotoThunkCreator,
        saveProfileThunkCreator
    }),
    withRouter
)(ProfileContainer)
