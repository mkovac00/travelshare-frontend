import React, { useContext } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Loading from "../../shared/components/UIElements/Loading";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import uploadImageLogo from "../../Assets/svgs/picture.svg";

import "./Share.css";

const Share = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      description: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const postSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("description", formState.inputs.description.value);
      formData.append("image", formState.inputs.image.value);
      await sendRequest("http://localhost:5000/api/posts", "POST", formData, {
        Authorization: "Bearer " + auth.token,
      });
    } catch (err) {}

    removeFormDataAfterPosting();
  };

  const removeFormDataAfterPosting = () => {
    setFormData({
      description: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    });
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="share-container" onSubmit={postSubmitHandler}>
        {isLoading && <Loading asOverlay />}
        <div className="share-top">
          <Input
            element="input"
            type="text"
            id="description"
            placeholder="Share where you've recently traveled to..."
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Every photo needs its description!"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Share
          </Button>
        </div>
        <div className="share-bot">
          <ImageUpload
            id="image"
            onInput={inputHandler}
            button={true}
            buttonText={
              // <img
              //   className="share-bot__image-logo"
              //   src={uploadImageLogo}
              //   alt="Upload"
              // />
              "SELECT IMAGE"
            }
            center
          />
        </div>
      </form>
    </React.Fragment>
  );
};

export default Share;
