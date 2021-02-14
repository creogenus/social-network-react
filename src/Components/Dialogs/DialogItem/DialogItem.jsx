import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    return <div>
        <NavLink to={"/dialogs/" + props.profile_id}>{props.name}</NavLink>
    </div>
}

export default  DialogItem;