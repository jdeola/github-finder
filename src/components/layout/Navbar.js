import React from 'react'; // shortcut: imr
import PropTypes from 'prop-types'; // shortcut: impt

const Navbar = ({ icon, title }) => {

    return (
        <nav className="navbar bg-primary">
            <h1>
                <i className={icon} /> {title}
            </h1>
        </nav>
    )
}

Navbar.PropTypes = {
    // shortcut: ptsr
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
}

Navbar.defaultProps = {
    title: 'Github Finder',
    icon: 'fab fa-github'
};
