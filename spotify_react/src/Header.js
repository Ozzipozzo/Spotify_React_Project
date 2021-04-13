import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
    return (
        <div className="main-header">
            <div className="main-logo">
                <NavLink to="/"><img className="logo-img" src="spotify-logo.png" alt=""></img>
                </NavLink>
            </div>
            <nav className="main-nav">
                <ul className="main-ul">
                    <li>
                        <NavLink to="/Artists">Artists</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Genres">Genres</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Albums">Albums</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Search">Search</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;