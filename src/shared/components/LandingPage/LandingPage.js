import React from "react";

import landingPageSvg from "../../../Assets/svgs/landing-svg.svg";

import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page__container">
      <div className="landing-page__image-wrapper">
        <img className="landing-page__image" src={landingPageSvg} />
      </div>
      <div className="landing-page__text-wrapper">
        <p className="landing-page__text-1">traveled?</p>
        <p className="landing-page__text-2">
          <span className="landing-page__text-2-green">share</span> it.
        </p>
        <p className="landing-page__text-3">Want to start sharing your traveling experience?</p>
        <p className="landing-page__text-4">Create an account.</p>
      </div>
    </div>
  );
};

export default LandingPage;
