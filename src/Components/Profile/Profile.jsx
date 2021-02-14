
import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


const Profile = (props) => {
    return (
        <div className={classes.content}>
            <ProfileInfo savePhoto = {props.savePhoto}
                         profile ={props.profile}
                         status = {props.status}
                         postUserStatus = {props.postUsersStatus}
                         disable = {props.disable}
                         isOwner = {props.isOwner}
                         saveProfile = {props.saveProfile}
            />
            <MyPostsContainer

            />
        </div>
    );
}

export default Profile;