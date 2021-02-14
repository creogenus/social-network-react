import {profileAPI} from "../api/api";
import store from "./redux-store";
import {stopSubmit} from "redux-form";

const ADD_POST = 'profile-reducer/ADD-POST'
const UPDATE_NEW_POST_TEXT = 'profile-reducer/UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'profile-reducer/SET-USER-PROFILE'
const GET_USER_STATUS = 'profile-reducer/GET-USER-STATUS'
const DELETE_POST = 'profile-reducer/DELETE-POST'
const SAVE_PHOTO = 'profile-reducer/SAVE-PHOTO'

let initialState = {
    posts: [
        {id: 1, message: 'My Last post!', likes_count: 22},
        {id: 2, message: 'My First post!', likes_count: 10}
    ],
    profile: null,
    status: "ALOXA"
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 3,
                message: action.post,
                likes_count: 1
            };
            let stateCopy = {...state};
            stateCopy.posts = [...state.posts];
            stateCopy.posts.push(newPost)
            stateCopy.newPostText = '';
            return stateCopy;
        }

        case  UPDATE_NEW_POST_TEXT: {
            let stateCopy = {...state};

            stateCopy.newPostText = action.newText;
            return stateCopy;
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case GET_USER_STATUS: {

            return {...state, status: action.status}
        }
        case DELETE_POST: {
            return {...state, posts: state.posts.filter(post => post.id != action.postID)}
        }
        case SAVE_PHOTO:{
            return {...state, profile:{...state.profile, photos:action.photos}}
        }
        default:
            return state;
    }
}

export let addPostActionCreator = (post) => {
    return {
        type: ADD_POST,
        post
    }
};
export let updateNewPostTextActionCreator = (newText) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: newText
    }
};
export let deletePostActionCreator = (postID) => {
    return {
        type: DELETE_POST,
        postID
    }
}
export let setUserProfile = (profile) => {

    return {
        type: SET_USER_PROFILE,
        profile
    }
}
export let savePhotoSuccess = (photos) =>{
    return{
        type: SAVE_PHOTO,
        photos
    }

}
export let getUserStatus = (status) => {
    return {
        type: GET_USER_STATUS,
        status
    }
}

export let getUserStatusThunkCreator = (userID) => {
    return async (dispatch) => {
        let response = await profileAPI.getUsersStatus(userID);
        dispatch(getUserStatus(response.data));
    }
}
export let postUserStatusThunkCreator = (status) => async (dispatch) => {
    let response = await profileAPI.postUsersStatus(status);
    dispatch(getUserStatus(status));


}
export const setUserProfileThunkCreator = (userID) => {
    return async (dispatch) => {

        let response = await profileAPI.setUserProfile(userID)
        dispatch(setUserProfile(response.data));
    }
}
export let savePhotoThunkCreator = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    dispatch(savePhotoSuccess(response.data.data.photos));
}
export let saveProfileThunkCreator = (profileData) => async (dispatch) =>{
   const userID = store.getState().auth.userID
    let response = await profileAPI.saveProfile(profileData)
    if(response.data.resultCode === 0)
    dispatch(setUserProfileThunkCreator(userID))
    else{
        dispatch(stopSubmit('profile-edit',{_error:response.data.messages[0]}))
        return Promise.reject(response.data.messages[0]);
    }
}


export default profileReducer;