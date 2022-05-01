import React, { useContext, useEffect, useState } from "react";

import PostList from "../components/PostList";
import FollowList from "../../users/components/FollowList";
import Share from "../components/Share";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Loading from "../../shared/components/UIElements/Loading";
import { AuthContext } from "../../shared/context/auth-context";
import Card from "../../shared/components/UIElements/Card";

import "./Homepage.css";

const Homepage = () => {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedFollowList, setLoadedFollowList] = useState();
  const [loadedPosts, setLoadedPosts] = useState();
  const [loadedPostUserInfo, setLoadedPostUserInfo] = useState();

  useEffect(() => {
    const fetchUserFollowList = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/following/${auth.userId}`, "GET", null, {
            Authorization: "Bearer " + auth.token,
          }
        );

        setLoadedFollowList(responseData.following);
      } catch (err) {}
    };
    fetchUserFollowList();
  }, [sendRequest, auth.userId, auth.token]);

  useEffect(() => {
    const fetchTimelinePosts = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/posts/user/timeline/${auth.userId}`, "GET", null, {
            Authorization: "Bearer " + auth.token,
          }
        );

        setLoadedPosts(responseData.posts);
        setLoadedPostUserInfo(responseData.users);
      } catch (err) {}
    };
    fetchTimelinePosts();
  }, [sendRequest, auth.userId, auth.token]);

  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
          <Loading />
        </div>
      )}
      <div className="homepage-container">
        <Share />
        {!isLoading && loadedFollowList && (
          <FollowList items={loadedFollowList} />
        )}
        {!isLoading && !loadedFollowList && (
          <Card className="card-no-posts">
            <p
              style={{
                color: "#606060",
              }}
            >
              No one you follow has uploaded anything, or you just don't follow
              anyone. :/
            </p>
            <p
              style={{
                color: "#606060",
              }}
            >
              Go to search and find someone to follow! :D
            </p>
          </Card>
        )}
        {!isLoading && loadedPosts && loadedPostUserInfo && (
          <PostList posts={loadedPosts} users={loadedPostUserInfo} />
        )}
      </div>
    </React.Fragment>
  );
};

export default Homepage;
