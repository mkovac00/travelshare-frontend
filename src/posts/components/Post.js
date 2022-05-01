import React, { useContext, useState, useEffect, useCallback } from "react";

import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import heartSymbol from "../../Assets/svgs/heart-red.svg";
import darkHeartSymbol from "../../Assets/svgs/heart.svg";
import commentSymbol from "../../Assets/svgs/comment.svg";
import deleteSymbol from "../../Assets/svgs/trash.svg";

import "./Post.css";

const Post = (props) => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [heartCount, setHeartCount] = useState(props.hearts);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isHearted, setIsHearted] = useState();

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/posts/${props.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      window.location.reload();
    } catch (err) {}
  };

  const heartHandler = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/posts/${props.id}/heart`,
        "PUT",
        JSON.stringify({
          userId: auth.userId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setHeartCount(responseData.hearts.length);
      seeIsHearted();
    } catch (err) {}
  };

  const seeIsHearted = useCallback(async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/posts/${
          props.id
        }/ishearted?userId=${encodeURIComponent(auth.userId)}`,
        "GET",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );

      setIsHearted(responseData.isHearted);
    } catch (err) {}
  }, [auth.userId, props.id, sendRequest, auth.token]);

  useEffect(() => {
    seeIsHearted();
  }, [auth.userId, seeIsHearted]);

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button
              className="cancel-btn"
              inverse
              onClick={cancelDeleteHandler}
            >
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Are you sure you want to delete this post? Really really sure? Like
          FOREVER delete? :/
        </p>
      </Modal>
      <li className="post-container">
        <Card className="post-content">
          <div className="post-user__info">
            <img
              className="post-user__profile-image"
              // src={props.profilePicture}
              src={`http://localhost:5000/${props.profilePicture}`}
              alt="profile"
            />
            <h3 className="post-user__name">{props.name}</h3>
            {auth.userId === props.creator && (
              <img
                className="post-activity__delete-svg"
                src={deleteSymbol}
                alt="Delete"
                onClick={showDeleteWarningHandler}
              />
            )}
          </div>
          <div className="post-upload__info">
            <p className="post-description">{props.description}</p>
            <img
              className="post-image"
              src={`http://localhost:5000/${props.image}`}
              alt="post"
            />
          </div>
          <div className="post-activity__info">
            <div className="post-activity__hearts">
              {isHearted ? (
                <img
                  className="post-activity__heart-svg"
                  src={heartSymbol}
                  alt="heart"
                  onClick={heartHandler}
                />
              ) : (
                <img
                  className="post-activity__heart-svg"
                  src={darkHeartSymbol}
                  alt="heart"
                  onClick={heartHandler}
                />
              )}
              <p className="post-activity__heart-num">
                {heartCount} {heartCount === 1 ? "Heart" : "Hearts"}
              </p>
            </div>
            <div className="post-activity__comments">
              <img
                className="post-activity__comment-svg"
                src={commentSymbol}
                alt="comment"
              />
              <p className="post-activity__comment-num">
                {props.comments} Comments
              </p>
            </div>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default Post;
