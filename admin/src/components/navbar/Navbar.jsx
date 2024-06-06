import React from "react";
import './Navbar.css';
import navbar_logo from '../../assets/nav-logo.svg';
import navbar_profile from '../../assets/nav-profile.svg';

function Navbar() {
    return(
        <div className="navbar">
            <img src={navbar_logo} alt="" className="navbar-logo"/>
            <img src={navbar_profile} alt="" className="navbar-profile"/>
        </div>
    );
}

export default Navbar;