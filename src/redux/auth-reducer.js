import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {Redirect} from "react-router-dom";

const SET_AUTH_USER_DATA = 'auth-reducer/SET-AUTH-USER-DATA'
const GET_CAPTCHA_URL = 'auth-reducer/GET-CAPTCHA-URL'


let initialState = {
    userID: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

let authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA: {
            return {
                ...state,
                ...action.data,
                isAuth: action.isAuth
            }
        }
        case GET_CAPTCHA_URL: {
            return {
                ...state,
                captchaUrl: action.captcha
            }
        }
        default:
            return state;
    }
}

export const setAuthUserData = (userID, email, login, isAuth) => ({
    type: SET_AUTH_USER_DATA,
    data: {userID, email, login},
    isAuth
})
const getCaptchaUrl = (captcha) => ({
    type:GET_CAPTCHA_URL,
    captcha
})


export const setAuthUserThunkCreator = () => async (dispatch) => {
    {
        let response = await authAPI.setAuthorizedProfile()
        if (response.data.resultCode === 0) {
            let {id, login, email} = response.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }

    }
}
export const loginThunkCreator = (email, password, rememberMe, captcha = null) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    dispatch(getCaptchaUrl(null))
    if (response.data.resultCode === 0) dispatch(setAuthUserThunkCreator())
    else {
        if(response.data.resultCode === 10)
        {
            dispatch(getCaptchaUrlThunkCreator())
        }
        else
        {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}));
        }
    }

}
export const getCaptchaUrlThunkCreator = () => async (dispatch) => {
    let response = await securityAPI.getCaptchaURL();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrl(captchaUrl))

}
export const logoutThunkCreator = () => {
    return async (dispatch) => {
        let response = await authAPI.logout()
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer;