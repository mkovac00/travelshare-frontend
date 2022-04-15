import React, { useState } from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Follow from "./Follow";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Loading from "../../shared/components/UIElements/Loading";

import "./Search.css";

const Search = () => {
  const [searchedPeople, setSearchedPeople] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const fetchSearchedUsers = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/users/search/?name=${encodeURIComponent(
          formState.inputs.name.value
        )}`
      );

      setSearchedPeople(responseData.users);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <Loading />
        </div>
      )}
      <div className="search-page__container">
        <div className="search-container">
          <Input
            element="input"
            type="text"
            id="name"
            placeholder="Search our users..."
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Can't search noone!"
            onInput={inputHandler}
          />
          <Button
            onClick={fetchSearchedUsers}
            type="submit"
            disabled={!formState.isValid}
          >
            Search
          </Button>
        </div>
        <Card className="search-output">
          {!isLoading && searchedPeople.length === 0 && (
            <div
              style={{
                color: "#606060",
                margin: "auto"
              }}
            >
              <h4>No one matches your search</h4>
            </div>
          )}
          {!isLoading &&
            searchedPeople &&
            searchedPeople.map((user) => (
              <Follow
                key={user.id}
                id={user.id}
                name={user.name}
                profilePhoto={user.profilePicture}
                className="search-output__person"
              />
            ))}
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Search;
