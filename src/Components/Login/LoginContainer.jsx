import Login from "./Login";
import {connect} from "react-redux";
import {loginThunkCreator, logoutThunkCreator} from "../../redux/auth-reducer";

let LoginContainer = (props) =>{

    return <Login logout={props.logoutThunkCreator} login = {props.loginThunkCreator} isAuth ={props.isAuth}
            captchaUrl = {props.captchaUrl}
    />
}

let mapStateToProps = (state) =>{
   return {
       isAuth: state.auth.isAuth,
       captchaUrl: state.auth.captchaUrl
   }
}


export  default connect(mapStateToProps,{
    logoutThunkCreator, loginThunkCreator
})(LoginContainer)