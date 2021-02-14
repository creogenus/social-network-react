import classes from './MyPosts.module.css'
import Post from './Post/Post'
import * as React from "react";
import AddPostForm from "./AddPostForm/AddPostForm";


const MyPosts =React.memo((props) => {

    let posts = props.posts.map((post) => <Post message={post.message} likes_count={post.likes_count}/>)

    let newPostElement = React.createRef();
    let addPost = () => {

        props.addPost();
    }

    let onPostChange = () => {
        props.updateNewPostText(newPostElement.current.value);
    }

    return (
        <div className={classes.postBlock}>
            my posts
            <div>
                {/*  <div> <textarea ref = {newPostElement} value={props.newPostText} onChange={onPostChange}/></div>
                <div>     <button onClick={addPost}>Add Post</button></div>*/}
                <AddPostForm addPost={props.addPost}
                             updateNewPostText={props.updateNewPostText}></AddPostForm>
            </div>
            <div className={classes.posts}>
                new posts
                {posts}
            </div>
        </div>
    );
})

export default MyPosts;