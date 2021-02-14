import styles from './FormControls.module.css'

export const FormControl= (props) =>{
    return(<div className={styles.formControl+" " +(props.children.props.touched && props.children.props.error ? styles.error:"")}>
            {props.children}
        {props.children.props.touched && props.children.props.error && <div>{props.children.props.error}</div>}

    </div>)

}
export const Textarea = (props) =>{
    const {input,meta,child,...restProps} = props;
    return(<FormControl><textarea {...input}{...meta}{...restProps}/></FormControl>)

}
// export const Textarea= ({input,meta,...props}) =>{
//     debugger;
//     return(<div>
//         <div className={styles.formControl+" " +(meta.touched && meta.error ? styles.error:"")}>
//             <textarea></textarea>
//         </div>
//         {meta.touched && meta.error && <div>{meta.error}</div>}
//     </div>)
//
// }
export const Input = (props) =>{

    const {input,meta,child,...restProps} = props;
    return(<FormControl><input {...input}{...meta}{...restProps}/></FormControl>)

}