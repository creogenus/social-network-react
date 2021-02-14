import * as React from "react";
import styles from './ProfileStatus.module.css'
import {useState,useEffect} from "react";

const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    const activateEditMode =() =>{
        setEditMode(true);
    }
    const onStatusChange = (e) =>{
        setStatus(e.currentTarget.value);
    }

    const deactivateEditMode =() =>{
        setEditMode(false);
        props.postUserStatus(status)
    }
    useEffect(() =>{
        setStatus(props.status)
    },[props.status])

    return <div className={styles.profileStatus}>
        { editMode?<input autoFocus={true} onChange={onStatusChange} value = {status} onBlur={deactivateEditMode}/>:
            <div onDoubleClick={()=>{setEditMode(true)}}>{props.status}</div>}
    </div>

}

export default ProfileStatusWithHooks;