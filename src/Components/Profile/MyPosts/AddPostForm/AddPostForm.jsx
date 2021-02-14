import {Field, reduxForm} from "redux-form";
import {requiredFields} from "../../../../utils/validators/validators";
import {Textarea} from "../../../common/FormControls/FormControls";


let AddPostForm = (props) =>{
    return <form onSubmit={props.handleSubmit}><div>
        <Field name ={'postText'} component={Textarea} validate={requiredFields} />
        <div>
            <button>Add Post</button></div>
    </div>
    </form>
}
const AddPostReduxForm = reduxForm({
    form:'addPostForm'
})(AddPostForm)

const AddPost = (props) => {
    const onSubmit = (formData) =>{
        console.log(formData)
        props.addPost(formData.postText);
    }

    return <div>
        <AddPostReduxForm onSubmit ={onSubmit}/>
    </div>
}
export  default  AddPost;