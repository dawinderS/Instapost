import React from "react";
import { Helmet } from "rl-react-helmet";
import { Link, withRouter, useHistory } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import useInput from "../Hooks/useInput";
import Input from "../Components/Input";

const ME = gql`
  {
    me {
      avatar
      name
      username
      bio
      email
      phone
      gender
    }
  }
`;

const EDITUSER = gql`
  mutation editUser(
    $avatar: String,
    $name: String,
    $username: String,
    $avatar: String,
    $avatar: String,
    $avatar: String
  ) {
    upload(caption: $caption, files: $files, location: $location) {
      id
      caption
      location
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 89vh;
  max-height: 89vh;
  width: 100%;
  overflow-y: auto;
`;

const MinHeader = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: ${(props) => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 16px;
  z-index: 2;
  height: 5.5vh;
  max-height: 44px;
  min-height: 44px;
  div {
    font-size: 17px;
    font-weight: 600;
    text-align: center;
  }
  span {
    font-size: 16px;
    font-weight: 400;
    width: 20%;
    display: flex;
    p {
      margin-left: auto;
      color: #0095f6;
      font-weight: 500;
    }
  }
  @media screen and (min-width: 770px) {
    display: none;
  }
`;

const MinLink = styled(Link)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default withRouter(({ }) => {
  const { data, loading } = useQuery(ME);
  const name = useInput("");
  const username = useInput("");
  const bio = useInput("");
  const email = useInput("");
  const phone = useInput("");
  const gender = useInput("");
  if (!loading) {

  }
  
  const history = useHistory();
  const onSearchSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <Wrapper id="outside">
      <Helmet>
        <title>Edit Profile • Instapost</title>
      </Helmet>
      <MinHeader>
        <span>Cancel</span>
        <div>Edit Profile</div>
        <span>
          <p>Done</p>
        </span>
      </MinHeader>
      {loading && <Loader />}
    </Wrapper>
  );
});
