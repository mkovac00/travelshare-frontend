import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import { AuthContext } from "../../context/auth-context";
import Button from "../FormElements/Button";

import homeLogoDark from "../../../Assets/svgs/home-dark.svg";
// import homeLogoLight from "../../../Assets/svgs/home-light.svg";
import searchLogoDark from "../../../Assets/svgs/search-dark.svg";
// import searchLogoLight from "../../../Assets/svgs/search-light.svg";
import profileLogoDark from "../../../Assets/svgs/user-dark.svg";
// import profileLogoLight from "../../../Assets/svgs/user-light.svg";
import logoutLogo from "../../../Assets/svgs/logout.svg";

import "./NavLinks.css";

const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <React.Fragment>
      {auth.isLoggedIn && (
        <ReactTooltip
          place="bottom"
          effect="solid"
          offset={{ bottom: 20 }}
          backgroundColor="#606060"
        />
      )}

      <ul className="nav-links">
        {!auth.isLoggedIn && (
          <Button to="/auth" width="200px">
            Get started
          </Button>
        )}
        {auth.isLoggedIn && (
          <li>
            <NavLink to="/home" data-tip="Home">
              <img
                className="nav-links__item"
                src={homeLogoDark}
                alt="Search"
              />
            </NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <NavLink to="/search" data-tip="Search">
              <img
                className="nav-links__item"
                src={searchLogoDark}
                alt="Search"
              />
            </NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <NavLink to={`/profile/${auth.userId}`} data-tip="Profile">
              <img
                className="nav-links__item"
                src={profileLogoDark}
                alt="Profile"
              />
            </NavLink>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <NavLink to="/" data-tip="Logout">
              <button onClick={auth.logout}>
                <img
                  className="nav-links__item"
                  src={logoutLogo}
                  alt="Logout"
                />
              </button>
            </NavLink>
          </li>
        )}
      </ul>
    </React.Fragment>
  );
};

export default NavLinks;
