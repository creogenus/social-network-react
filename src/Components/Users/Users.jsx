import React from 'react';
import userAvatar from './../../assets/images/1.jpg';
import styles from './Users.module.css';
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";
import User from "./User/User";

const Users = (props) => {
    return (
        <div>
            {<Paginator onPageChanged={props.onPageChanged} pageSize={props.pageSize}
                       totalItemsCount={props.totalUsersCount} currentPage ={props.currentPage}/>}
            {props.users.map((u) =><div key={u.id}> <User
            userID={u.id}
            isFollowingInProgress={props.isFollowingInProgress}
            small={u.photos.small}
            followed={u.followed}
            unfollow={props.unfollow}
            follow={props.follow}
            name={u.name}
            status={u.status}/></div>
            )}


        </div>)
}
export default Users;
{/*   <span>
                <div>
                    <NavLink to={'/profile/' + u.id}>
                    <img className={styles.smallUsersAvatar}
                         src={u.photos.small != null ? u.photos.small : userAvatar}></img>
                        </NavLink>
                </div>
                <div>
                    {u.followed ?
                        <button disabled={props.isFollowingInProgress.some(id => id === u.id)} onClick={() => {
                            debugger;
                            props.unfollow(u.id);

                        }}>Unfollow</button> :
                        <button disabled={props.isFollowingInProgress.some(id => id === u.id)} onClick={() => {
                            props.follow(u.id);

                        }}>Follow</button>}
                        </div>
                        </span>
                        <span>
                        <div>{u.name}</div><div>{u.status}</div>
                        <div>Ukraine</div><div>Odessa</div>
                        </span>
                    </div>*/}
