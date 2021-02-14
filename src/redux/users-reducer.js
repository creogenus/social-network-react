import {usersAPI} from "../api/api";

const CHANGE_FOLLOW_STATUS = 'users-reducer/CHANGE-FOLLOW-STATUS';
const SET_USERS = 'users-reducer/SET-USERS';
const SET_CURRENT_PAGE = 'users-reducer/SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'users-reducer/SET-TOTAL-USERS-COUNT'
const TOGGLE_IS_FETCHING = 'users-reducer/TOGGLE-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = 'users-reducer/TOGGLE-IS-FOLLOWING-IN-PROGRESS'

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowingInProgress: []
}


const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_FOLLOW_STATUS: {

            let stateCopy = {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: !u.followed}
                    }
                    return u;
                }),
                ...state.users.location
            }
            return stateCopy;
        }
        case SET_USERS: {

            return {...state, users: [...action.users]}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage};
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                isFollowingInProgress: action.isFetching
                    ? [...state.isFollowingInProgress, action.userID]
                    : state.isFollowingInProgress.filter(id => id !== action.userID)
            }
        }
        default:
            return state;
    }
}

let followFlowFunction = async (dispatch,func, userID) => {
    dispatch(toggleIsFollowingInProgress(true, userID));
    let data = await func(userID)
    if (data.resultCode === 0) {
        dispatch(followChangeAC(userID))

    }
    dispatch(toggleIsFollowingInProgress(false, userID));

}

export const followChangeAC = (userID) => ({type: CHANGE_FOLLOW_STATUS, userID})
export const setUsersAC = (users) => ({type: SET_USERS, users})
export const setCurrentPageAC = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCountAC = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})
export const toggleIsFetchingAC = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleIsFollowingInProgress = (isFetching, userID) => ({
    type: TOGGLE_IS_FOLLOWING_IN_PROGRESS,
    isFetching,
    userID
})


export const getUsersThunkCreator = (currentPage, pageSize) => {
    return async (dispatch) => {
        debugger
        dispatch(toggleIsFetchingAC(true));
        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(setUsersAC(data.items));
        dispatch(setTotalUsersCountAC(data.totalCount));
        dispatch(setCurrentPageAC(currentPage));
        dispatch(toggleIsFetchingAC(false));
    }
}
export const followThunkCreator = (userID) => {
    return async (dispatch) =>{
    followFlowFunction(dispatch,usersAPI.followAPI, userID)}
}
export const unfollowThunkCreator = (userID) => {
    return async (dispatch) =>{
        followFlowFunction(dispatch,usersAPI.unfollowAPI, userID)}
}

export default usersReducer;