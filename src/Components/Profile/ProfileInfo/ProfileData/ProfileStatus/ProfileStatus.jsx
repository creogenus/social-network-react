import * as React from "react";
import styles from './ProfileStatus.module.css'

class ProfileStatus extends React.Component {
     state = {
        editMode:false,
        status:this.props.status
    }
    activateEditMode  = () =>{

        this.setState({
            editMode:true
        })
    }

    deactivateEditMode = () =>{
        this.setState({
            editMode:false
        })
        this.props.postUserStatus(this.state.status)
    }

    onStatusChange = (e) =>{
        this.setState(
            {
                status: e.currentTarget.value
            }
        )
    }
    componentDidUpdate(prevProps,prevState) {
         debugger;
       if(prevProps.status !== this.props.status)
        this.setState(
            {
                status: this.props.status
            })
    }

    render() {
        console.log("render")
        return <div className={styles.profileStatus}>
            {this.state.editMode ? <input  onChange = {this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}/>:
            <span  disabled={this.props.disable}  onDoubleClick={this.props.disable?()=>{}:this.activateEditMode} >{this.state.status}</span> }
        </div>
    }
}

export default ProfileStatus;