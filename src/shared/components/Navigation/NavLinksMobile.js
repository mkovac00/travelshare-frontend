import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import Button from "../FormElements/Button";

import "./NavLinksMobile.css";

const NavLinksMobile = () => {
  const auth = useContext(AuthContext);

  return (
    <React.Fragment>
      <ul className="nav-links-mobile">
        {!auth.isLoggedIn && <Button to="/auth">Get started</Button>}
        {auth.isLoggedIn && (
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <NavLink to="/search">Search</NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <NavLink to={`/profile/${auth.userId}`}>Profile</NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <NavLink to="/" onClick={auth.logout}>
              Logout
            </NavLink>
          </li>
        )}
      </ul>
    </React.Fragment>
  );
};

export default NavLinksMobile;
