import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormControls/FormControls";
import {requiredFields} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";
import styles from './../../Components/common/FormControls/FormControls.module.css'

const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field placeholder='Email' name={'email'} component={Input} validate={requiredFields}/>
        </div>
        <div>
            <Field placeholder='Password' name={'password'} type={'password'} component={Input}
                   validate={requiredFields}/>
        </div>
        <div>
            <Field component={'input'} name={'rememberMe'} type={"checkbox"}/> Remember me
        </div>
        {props.error && <div className={styles.formSummaryError}>
            {props.error}
        </div>}
            {props.captchaUrl?<div><img src = {props.captchaUrl}/></div>:''}
        {props.captchaUrl?<div><Field component={Input} name={'captcha'} placeholder={'Captcha'}/></div>:''}
        <div>
            <button>Login</button>
        </div>
    </form>

}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"}></Redirect>
    }
    return <div>
        <h1>Login</h1>

        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}
export default Login;