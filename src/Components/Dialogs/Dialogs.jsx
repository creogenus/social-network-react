import style from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import MessageItem from "./MessageItem/MesssageItem";
import {Redirect} from "react-router-dom";
import AddMessage from "./AddMessageForm/AddMessageForm";



const Dialogs = (props) => {
     let DialogMessages = props.DialogsMessages;
     let DialogsProfiles = props.DialogsProfiles;
    let DialogsElements = DialogsProfiles.map((profile) => <DialogItem name={profile.name} profile_id={profile.profile_id}/>);
    let MessagesElements = DialogMessages.map((message) => <MessageItem  message = {message.message}/>
    );

    let onSendMessageClick = () =>{
        props.sendMessage();
    }

    let onChangeMessageBody = (e) =>{
        let body = e.target.value;
        props.updateNewMessageBody(body);
    }
    if (!props.isAuth) return <Redirect to={"/login"} /> ;
    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                <div className={`${style.dialog} ${style.active}`} >{DialogsElements}</div>
            </div>
            <div className={style.messages}>
                <div className = {style.message}>{MessagesElements}</div>
               {/* <textarea value = {props.newMessageBody} placeholder='Введите сообщение' onChange={onChangeMessageBody}></textarea>
                <div>
                    <button onClick={onSendMessageClick}>Добавить сообщение</button>
                </div>*/}
                <AddMessage sendMessage ={props.sendMessage} ></AddMessage>
            </div>
            <div>

            </div>
        </div>
    );
}

export default Dialogs;