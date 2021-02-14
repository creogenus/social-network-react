import {Field, reduxForm} from "redux-form";
import {maxLength300, requiredFields} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormControls/FormControls";

let AddMessageForm = (props) =>{
    return<form onSubmit={props.handleSubmit}>
        <Field component={Textarea}  name={'message'} validate={[requiredFields, maxLength300]}placeholder='Введите сообщение'/>
        <div>
            <button>Добавить сообщение</button>
        </div>
    </form>
}
const AddMessageReduxForm = reduxForm({
    form:'addPostForm'
})(AddMessageForm)

let AddMessage = (props) =>{
    const onSubmit = (formData) =>{
        console.log(formData)
        props.sendMessage(formData.message);
    }

    return <div>
        <AddMessageReduxForm onSubmit ={onSubmit}/>
    </div>
}

export default AddMessage;