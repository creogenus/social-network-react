import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import Contact from "./Contact/Contact";
import {useState} from "react";
import {Input} from "../../../common/FormControls/FormControls";

const ProfileData = (props) => {
    let [editMode, setEditMode] = useState(false);
    let deactivateEditMode = () =>{
        setEditMode(false);

    }
    return (<div>
            <div>
                {props.profile.fullName}
            </div>
            <div>

                <b>Status: </b><ProfileStatusWithHooks status={props.status} postUserStatus={props.postUserStatus}
                                        disable={props.disable}/>
            </div>
            <div>
                <b>About me: </b>{props.profile.aboutMe}
            </div>
            <div>
                <b>Looking for a job:</b> {props.profile.lookingForAJob?'yes':'no'}
            </div>
            <div>
                <b>Looking for a job description:</b> {props.profile.lookingForAJobDescription}
            </div>
            <div>
                {
                        Object.keys(props.profile.contacts).map(k => {
                                        return(
                                        <Contact key={k} title={k} link={props.profile.contacts[k]}/>)
                                    })
                }
            </div>
        </div>
    )
}

export default ProfileData