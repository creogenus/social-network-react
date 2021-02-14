import {NavLink} from "react-router-dom";
import styles from "../Users.module.css";
import userAvatar from "../../../assets/images/1.jpg";
import React from "react";

let User = ({userID, small, isFollowingInProgress, follow, unfollow, name, status, followed,...props}) =>{
    return<div>
            <span>
                <div>
                    <NavLink to={'/profile/' + userID}>
                    <img className={styles.smallUsersAvatar}
                         src={small != null ? small : userAvatar}></img>
                        </NavLink>
                </div>
                <div>
                    {followed ?
                        <button disabled={isFollowingInProgress.some(id => id === userID)} onClick={() => {
                            unfollow(userID);

                        }}>Unfollow</button> :
                        <button disabled={isFollowingInProgress.some(id => id === userID)} onClick={() => {
                            follow(userID);

                        }}>Follow</button>}
                        </div>
                        </span>
        <span>
                        <div>{name}</div><div>{status}</div>
                        <div>Country</div><div>City</div>
                        </span>
    </div>
}

export  default  User