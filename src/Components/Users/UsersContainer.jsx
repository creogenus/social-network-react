import {
    followChangeAC, getUsersThunkCreator,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    toggleIsFetchingAC,
    toggleIsFollowingInProgress,
    followThunkCreator,
    unfollowThunkCreator

} from "../../redux/users-reducer";
import * as React from "react";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getIsFetching,
    getIsFollowingInProgress,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";
const {connect} = require("react-redux");

class UsersC extends React.Component {


    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);

    }

    onPageChanged = (pageNumber) => {
       this.props.getUsersThunkCreator(pageNumber, this.props.pageSize)

    }

    render() {
        return (
            <>
                {this.props.isFetching ? <Preloader/> : null}
                <Users totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       onPageChanged={this.onPageChanged}
                       users={this.props.users}
                       isFetching={this.props.isFetching}
                       isFollowingInProgress={this.props.isFollowingInProgress}
                       toggleIsFollowingInProgress={this.props.toggleIsFollowingInProgress}
                       follow = {this.props.followThunkCreator}
                       unfollow = {this.props.unfollowThunkCreator}
                />
            </>
        )
    }
}



let mapStateToProps = (state) => {

    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowingInProgress: getIsFollowingInProgress(state)
    }
}





export default compose(connect(mapStateToProps, {
        followChangeAC,
        setUsersAC,
        setCurrentPageAC,
        setTotalUsersCountAC,
        toggleIsFetchingAC,
        toggleIsFollowingInProgress,
        getUsersThunkCreator,
        followThunkCreator,
        unfollowThunkCreator}),
    withAuthRedirect)(UsersC)
;