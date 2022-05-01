import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import PostList from "../../posts/components/PostList";
import Loading from "../../shared/components/UIElements/Loading";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./Profile.css";

const Profile = () => {
  const auth = useContext(AuthContext);
  const { uid } = useParams();
  const { isLoading, sendRequest } = useHttpClient();
  const [loadedPosts, setLoadedPosts] = useState();
  const [loadedPostUserInfo, setLoadedPostUserInfo] = useState();
  const [loadedUser, setLoadedUser] = useState();
  const [isFollowed, setIsFollowed] = useState();

  const followHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        `http://localhost:5000/api/users/${uid}/follow`,
        "PUT",
        JSON.stringify({
          userId: auth.userId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}
  };

  const seeIsFollowed = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/users/${uid}/isfollowed?userId=${encodeURIComponent(
          auth.userId
        )}`,
        "GET",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );

      setIsFollowed(responseData.isFollowed);
    } catch (err) {}
  }, [auth.userId, uid, sendRequest, auth.token]);

  useEffect(() => {
    seeIsFollowed();
  }, [auth.userId, seeIsFollowed]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${uid}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );

        setLoadedUser(responseData.user);
      } catch (err) {}
    };
    fetchUserData();
  }, [sendRequest, uid, auth.token]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/posts/user/${uid}`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );

        setLoadedPosts(responseData.posts);
        setLoadedPostUserInfo(responseData.user);
      } catch (err) {}
    };
    fetchUserPosts();
  }, [sendRequest, uid, auth.token]);

  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
          <Loading />
        </div>
      )}

      <div className="profile-container">
        {!isLoading && loadedUser && (
          <div className="profile-top">
            <img
              className="profile-top__cover-photo"
              src={loadedUser.coverPicture}
              alt="cover"
            />
            <div className="profile-top__profile-photo-container">
              <img
                className="profile-top__profile-photo"
                src={`http://localhost:5000/${loadedUser.profilePicture}`}
                alt="profile"
              />
            </div>
          </div>
        )}

        <div className="profile-bottom">
          {!isLoading && loadedUser && (
            <Card className="profile-bottom__user-info-card">
              <div className="profile-bottom__user-info">
                <div className="profile-bottom__user-info-top">
                  <h2 className="profile-bottom__user-info-name">
                    {loadedUser.name}
                  </h2>
                  {auth.userId === uid && <Button to="/edit">Edit</Button>}
                  {auth.userId !== uid && !isFollowed && (
                    <Button type="submit" onClick={followHandler}>
                      Follow
                    </Button>
                  )}
                  {auth.userId !== uid && isFollowed && (
                    <Button type="submit" onClick={followHandler}>
                      Unfollow
                    </Button>
                  )}
                </div>
                <div className="profile-bottom__user-info-mid">
                  <p className="profile-bottom__user-info-description">
                    {loadedUser.description}
                  </p>
                </div>
                <div className="profile-bottom__user-info-bot">
                  <div className="profile-bottom__user-info-followers">
                    Followers {loadedUser.followers.length}
                  </div>
                  <div className="profile-bottom__user-info-following">
                    Following {loadedUser.following.length}
                  </div>
                </div>
              </div>
            </Card>
          )}

          <div className="profile-bottom__user-posts">
            {(!loadedPosts || loadedPosts.length === 0) && (
              <Card className="profile-card__no-posts">
                <h2>No posts yet. :/</h2>
              </Card>
            )}
            {loadedPosts && loadedPostUserInfo && (
              <PostList posts={loadedPosts} users={loadedPostUserInfo} />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
