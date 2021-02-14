
import {setAuthUserThunkCreator} from "./auth-reducer";

const SET_INITIALIZED = 'app-reducer/SET-INITIALIZED'


let initialState ={
   initialized:false
}

let appReducer = (state = initialState, action) =>{
    switch (action.type){
        case SET_INITIALIZED:{
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
}

export let initializeSuccess = () =>({
    type: SET_INITIALIZED
})

export let initializeApp = () => async (dispatch) =>{
    let response = await dispatch(setAuthUserThunkCreator());
    dispatch(initializeSuccess());
}

export  default appReducer;