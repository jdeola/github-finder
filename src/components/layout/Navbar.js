import React from 'react'; // shortcut: imr
import PropTypes from 'prop-types'; // shortcut: impt
import { Link } from 'react-router-dom'; // shortcut: imbrl

const Navbar = ({ icon, title }) => {

    return (
        <nav className="navbar bg-primary">
            <h1>
                <i className={icon} /> {title}
            </h1>
            <ul>
                <li>
                    <Link to='/' >Home</Link>
                </li>
                <li>
                    <Link to='/about' >About</Link>
                </li>
            </ul>
        </nav>
    )
}
//using Link vs <a> allows for history to be remembered for back button
Navbar.propTypes = {
    
    title: PropTypes.string.isRequired, // shortcut: ptsr
    icon: PropTypes.string.isRequired
}

Navbar.defaultProps = {
    title: 'Github Finder',
    icon: 'fab fa-github'
};

export default Navbar;