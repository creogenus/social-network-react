import styles from "./ProfileInfo.module.css"
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from './../../../assets/images/1.png'
import ProfileData from "./ProfileData/ProfileData";
import {useState} from "react";
import ProfileDataForm from "./ProfileData/ProfileDataForm";


const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false)
    if (!props.profile) {
        return <Preloader/>
    } else {

        let onUserPhotoAvatarChange = (e) => {
            if (e.target.files.length > 0) {
                props.savePhoto(e.target.files[0])
            }
        }

        return (
            <div>
                <div className={styles.descriptionBlock}>
                    <div className={styles.profileAvatar}>
                        <img src={props.profile.photos.large || userPhoto}/>
                    </div>
                    <div>
                        {
                            props.isOwner ? <input type={'file'} onChange={onUserPhotoAvatarChange}/> : ''
                        }
                    </div>
                    {
                        !editMode ?
                            <ProfileData profile={props.profile} status={props.status}
                                         disable={props.disable}
                                         postUserStatus={props.postUserStatus}
                            />
                            : <ProfileDataForm profile={props.profile} status={props.status}
                                               disable={props.disable}
                                               postUserStatus={props.postUserStatus}
                                               saveProfile = {props.saveProfile}
                                               deactivateEditMode = {()=>{setEditMode(false)}}
                                               initialValues = {props.profile}
                            />
                    }
                    {
                        props.isOwner && !editMode ? <button onClick={() => {
                            setEditMode(true)
                        }}>Edit profile</button> : ''
                    }
                </div>
            </div>
        )
    }
}

export default ProfileInfo;