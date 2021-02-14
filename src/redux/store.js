import profileReducer from "./profile-reducer";
import messagesReducer from "./messages-reducer";
import sidebarReducer from "./sidebar-redcuder";







let store = {
    _state: {
        messagesPage: {
            dialogs: [
                {message: 'hi!', id: 1},
                {message: 'hello!', id:2},
                {message: 'how ar u?', id:3},
                {message: 'good! what bout u?', id:4}],
            profiles: [
                {name: 'Alexey', profile_id: '1'},
                {name: 'Sasha', profile_id: '2'},
                {name: 'Anton', profile_id: '3'},
                {name: 'Valera', profile_id: '4'},
            ],
            newMessageBody: 'value 123'
        },
        profilePage: {
            posts: [
                {id: 1, message: 'My Last post!', likes_count: 22},
                {id: 2, message: 'My First post!', likes_count: 10}
            ],

            newPostText: 'value 123'
        },
        sidebar:{

        }
    },
     _callSubscriber() {
        console.log("call Subscriber");
    },
    getState()
    {
        return this._state;
    },
    subscribe (observer){
        this._callSubscriber = observer;
    },
    dispatch(action){

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = messagesReducer(this._state.messagesPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);
    }

}


export default store;