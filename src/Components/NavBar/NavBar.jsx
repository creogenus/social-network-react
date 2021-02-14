import classes from './NavBar.module.css';
import {BrowserRouter, NavLink} from "react-router-dom";


const NavBar = () => {
    return (

            <nav className={classes.nav}>

                <div className={`${classes.items}`}>

                    <div >
                        <NavLink to='/profile' activeClassName = {classes.activeLink}>Profile</NavLink>
                    </div>
                    <div >
                        <NavLink to='/dialogs' activeClassName = {classes.activeLink}>Messages</NavLink>
                    </div>
                    <div>
                        <NavLink to='/users' activeClassName = {classes.activeLink}>Users</NavLink>
                    </div>
                    <div>
                        News
                    </div>
                    <div>
                        Music
                    </div>
                    <div>
                        Settings
                    </div>
                </div>
            </nav>
    );
}

export default NavBar;