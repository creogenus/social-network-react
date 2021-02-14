import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../../../common/FormControls/FormControls";
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import styles from "../../../common/FormControls/FormControls.module.css";

const ProfileDataForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Input} name='fullName'/>
        </div>
        <div>

            <b>Status: </b><ProfileStatusWithHooks status={props.status} postUserStatus={props.postUserStatus}
                                                  disable={props.disable}/>
        </div>
        <div>
            <b>About me:</b><Field name = 'aboutMe' component={Textarea}></Field>
        </div>
        <div>
            <Field component={'input'} name='lookingForAJob' type={"checkbox"}/> Looking for a job
        </div>
        <div>
            <b>Looking for a job description:</b> <Field component={Textarea} name='lookingForAJobDescription'/>
        </div>
        <div>
            {
                Object.keys(props.profile.contacts).map(k => {
                    return(
                        <span><b>{k}:</b><Field name = {`contacts.${k}`} component={Input} placeholder={props.profile.contacts[k]}></Field></span>)
                })
            }
        </div>
        { props.error && <div className={styles.formSummaryError}>
            {props.error}
        </div>
        }
        <div>
            <button>Apply changes</button>
        </div>
    </form>

}

const ProfileDataReduxForm = reduxForm({
    form:'profile-edit'
})(ProfileDataForm)


let ProfileData = (props) =>{
    const onSubmit = (formData) =>{
        props.saveProfile(formData).then(()=>{
            props.deactivateEditMode();
        });
    }
    return<ProfileDataReduxForm {...props} onSubmit ={onSubmit}/>
}


export default ProfileData