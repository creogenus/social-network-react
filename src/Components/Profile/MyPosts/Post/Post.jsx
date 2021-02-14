import classes from './Post.module.css'

const Post = (props) =>
{
    return(
            <div className = {classes.item}>
              <h1>{props.message}</h1>
              <div>likes - {props.likes_count}</div>
            </div>

    );
}

export default Post;