import React from "react";
import { Link } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";

import profileIcon from "../../Assets/svgs/user-dark.svg";

import "./Follow.css";

const Follow = (props) => {
  return (
    <Link to={`/profile/${props.id}`}>
      <Card className={`follow-card ${props.className}`}>
        <div className="follow-leftside">
          <img className="follow-photo" src={`http://localhost:5000/${props.profilePhoto}`} alt="Profile" />
          <p className="follow-name">{props.name}</p>
        </div>
        <div className="follow-rightside">
          <img
            className="follow-profile__icon"
            src={profileIcon}
            alt="Profile"
          />
        </div>
      </Card>
    </Link>
  );
};

export default Follow;
