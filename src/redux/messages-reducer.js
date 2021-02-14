export const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
export const SEND_MESSAGE = 'SEND-MESSAGE'

export let sendMessageActionCreator = (message) =>{
    return{
        type: SEND_MESSAGE,
        message
    }
}

export let updateNewMessageBody = (newMessage) =>{
    return{
        type: UPDATE_NEW_MESSAGE_BODY,
        body:newMessage
    }
}

let initialState ={
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
}

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
        {
            let newMessage = {
              message:  action.message,
              id:5
            };
            let stateCopy = {...state};
            stateCopy.dialogs =[...state.dialogs];
            stateCopy.dialogs.push(newMessage)

            return stateCopy;
        }
        case UPDATE_NEW_MESSAGE_BODY:
        {
            let stateCopy = {...state};
            stateCopy.newMessageBody = action.body;
            return stateCopy;
        }
        default:
            return state;
    }

}

export default messagesReducer;