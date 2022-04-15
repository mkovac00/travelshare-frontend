import React, { useState } from "react";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import NavLinksMobile from "./NavLinksMobile";
import MobileNav from "./MobileNav";
import Backdrop from "../UIElements/Backdrop";

import "./MainNavigation.css";

const MainNavigation = () => {
  const [mobileMenuIsActive, setMobileMenuIsActive] = useState(false);

  const activateMobileMenuHandler = () => {
    setMobileMenuIsActive(true);
  };

  const deactivateMobileMenuHandler = () => {
    setMobileMenuIsActive(false);
  };

  return (
    <React.Fragment>
      {mobileMenuIsActive && <Backdrop onClick={deactivateMobileMenuHandler} />}
      <MobileNav
        show={mobileMenuIsActive}
        onClick={deactivateMobileMenuHandler}
      >
        <nav className="main-navigation__mobile-nav">
          <NavLinksMobile />
        </nav>
      </MobileNav>

      <MainHeader>
        <h1 className="main-navigation__title">travelshare</h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
        <button
          className="main-navigation__menu-btn"
          onClick={activateMobileMenuHandler}
        >
          <span className="main-navigation__menu-btn__small" />
          <span className="main-navigation__menu-btn__large" />
          <span className="main-navigation__menu-btn__small" />
        </button>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;

/* 
Triba dodat MainHeader i ukomponirat ga u ostatak kako bi sve
radilo kako spada. Cya hf
*/
