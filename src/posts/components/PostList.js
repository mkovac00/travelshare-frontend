import React from "react";

import Card from "../../shared/components/UIElements/Card";
import Post from "./Post";
import "./PostList.css";

const PostList = (props) => {
  if (!props.posts) {
    return (
      <div className="place-list center">
        <Card className="profile-card__no-posts">
          <h2>No posts yet. :/</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="post-list">
      
      {props.posts.map((post, index) => (
        <Post
          key={post.id}
          id={post.id}
          name={props.users[index].name || "User"}
          profilePicture={
            props.users[index].profilePicture ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Official_portrait_of_Barack_Obama.jpg/640px-Official_portrait_of_Barack_Obama.jpg"
          }
          // profilePicture={`http://localhost:5000/${props.users[index].profilePicture}`}
          description={post.description}
          image={post.image}
          hearts={post.hearts.length}
          heartsUserIDs={props.hearts}
          comments={0}
          creator={props.users[index].id}
        />
      ))}
    </ul>
  );
};

export default PostList;
