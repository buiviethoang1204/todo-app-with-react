import { NavLink } from 'react-router-dom';
import styles from './style.module.css'
import clsx from 'clsx'

function Navbar () {
    return (
        <div id={clsx(styles.navbar)}>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/register'>Register</NavLink>
                    </li>
                    <li>
                        <NavLink to='/sign_in'>Sign In</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;