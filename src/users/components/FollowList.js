import React from "react";

import Follow from "./Follow";

import "./FollowList.css";

const FollowList = (props) => {
    return (
        <div className="follow-list__container">
            <h2 className="follow-list__header">
                your travelshare follows
            </h2>
            <div className="follow-list__followers">
                {props.items.map(user => (
                    <Follow
                        key={user.id}
                        id={user.id}
                        name={user.name}   
                        profilePhoto={user.profilePicture}            
                    />
                ))}
            </div>
        </div>
    )
}

export default FollowList;