import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Loading from "../../shared/components/UIElements/Loading";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import "./EditProfile.css";

const EditProfile = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const navigate = useNavigate();

    const [formState, inputHandler] = useForm(
        {
            description: {
                value: "",
                isValid: false
            }
        },
        false
    )

    const userInfoEditHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(
                `http://localhost:5000/api/users/${auth.userId}`,
                'PATCH',
                JSON.stringify({
                    description: formState.inputs.description.value
                }),
                {
                    "Content-Type": "application/json"
                }
            )
            navigate("/profile/" + auth.userId);
        } catch (err) {}
    }

    if (isLoading) {
        return (
            <div className="center">
                <Loading />
            </div>
        )
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && (
                <form className="user-edit-form" onSubmit={userInfoEditHandler}>
                <Input
                  id="description"
                  element="input"
                  type="text"
                  label="Profile description"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="You didn't type anything silly! :)"
                  onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                  UPDATE PROFILE
                </Button>
              </form>
            )}
        </React.Fragment>
    )
}

export default EditProfile;
