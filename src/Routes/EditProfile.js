import React, { useState, useEffect } from "react";
import { Helmet } from "rl-react-helmet";
import { Link, withRouter, useHistory } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "react-apollo-hooks";
import TextareaAutosize from "react-autosize-textarea";
import { ME, GET_USER_BY_ID } from "../SharedQueries";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";

const EDITUSER = gql`
  mutation editUser($avatar: String, $name: String, $username: String, $bio: String, $phone: Int, $gender: String) {
    editUser(avatar: $avatar, name: $name, username: $username, bio: $bio, phone: $phone, gender: $gender) {
      id
      avatar
      name
      username
      bio
      phone
      gender
    }
  }
`;

const Textarea = styled(TextareaAutosize)`
  display: flex;
  align-items: center;
  margin-top: 15px;
  width: 100%;
  background-color: #fff;
  border-radius: 0;
  border: 1px solid #dbdbdb;
  font-size: 15px;
  line-height: 18px;
  padding: 5px 10px;
  min-height: 100px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
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

const FormOuter = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  max-height: 82vh;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  padding: 35px;
`;

const CompletePart = styled.div`
  width: 84%;
  display: flex;
  margin-bottom: 16px;

`;

const FirstPart = styled.div`
  display: flex;
  margin-right: 35px;
  align-items: center;
  justify-content: flex-end;
  width: 30%;
  font-size: 16px;
  font-weight: 600;
  color: #262626;
`;

const SecondPart = styled.div`
  width: 70%;
  display: flex;
  input {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #fff;
    border-radius: 3px;
    font-size: 15px;
    padding: 0 10px;
    height: 32px;
    font-weight: 300;
    line-height: 18px;
    outline: none;
    border: 1px solid #dbdbdb;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 25px;
  div {
    text-align: center;
    width: 45%;
    border: 1px solid #dbdbdb;
    padding: 10px 10px;
    border-radius: 5px;
    cursor: pointer;
    color: grey;
    font-size: 15px;
    font-weight: 600;
  }
  span {
    width: 45%;
    padding: 10px 10px;
    background-color: #0095f6;
    border-radius: 5px;
    border: 1px solid transparent;
    text-align: center;
    cursor: pointer;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    margin-left: 30px;
  }
`;

export default withRouter(({ }) => {
  const [loadingA, setLoadingA] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const history = useHistory();
  const { data, loading } = useQuery(ME);
  const [isEditProfilePicOpen, setIsEditProfilePicOpen] = useState(false);
  const [editUserMutation] = useMutation(EDITUSER
  ,{
    refetchQueries: () => [
      { query: GET_USER_BY_ID, variables: { id: data.me.id } }
    ],
  });
  
  const goBack = (e) => {
    history.push(`/${username}`);
  };

  useEffect(() => {
    if (loading) return;
    const { me } = data;
    if (me.name) setName(me.name);
    setUsername(me.username);
    if (me.bio) setBio(me.bio);
    setEmail(me.email);
    if (me.phone) setPhone(me.phone);
    if (me.gender) setGender(me.gender);
  }, [data]);

  const updateState = (e) => {
    const value = e.target.value;
    switch (e.target.getAttribute("name")) {
      case "name":
        setName(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "bio":
        setBio(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "gender":
        setGender(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = async () => {
    if (username === "" || email === "") {
      toast.error("An username & email are required.");
      return;
    }
    // const formData = new FormData();
    // formData.append("file", picture);
    try {
      setLoadingA(true);
      // const {
      //   data: { location },
      // } = await axios.post("http://localhost:4000/api/upload", formData, {
      //   headers: {
      //     "content-type": "multipart/form-data",
      //   },
      // });
      const {
        data: { editUser },
      } = await editUserMutation({
        variables: {
          // files: [location],
          name, username, bio, email, phone: parseInt(phone), gender
        },
      });
      console.log(editUser);
      if (editUser) {
        console.log(editUser.username);
        history.push(`/${editUser.username}`);
      }
    } catch (e) {
      toast.error("Cannot update profile, please try again. If you are providing a new username/email, that username/email might already be in use.");
      console.log(e);
    } finally {
      setLoadingA(false);
    }
  };

  return (
    <Wrapper id="outside">
      <Helmet>
        <title>Edit Profile • Instapost</title>
      </Helmet>
      <MinHeader>
        <span onClick={goBack}>Cancel</span>
        <div>Edit Profile</div>
        <span>
          <p onClick={handleSubmit}>Done</p>
        </span>
      </MinHeader>
      {loading && <Loader />}
      {!loading && data.me && (
        <FormOuter>
          <CompletePart>
            <FirstPart>Name</FirstPart>
            <SecondPart>
              <input
                id="name"
                name="name"
                placeholder={"Name"}
                onChange={updateState}
                value={name}
              />
            </SecondPart>
          </CompletePart>
          <CompletePart>
            <FirstPart>Username</FirstPart>
            <SecondPart>
              <input
                id="username"
                name="username"
                placeholder={"Username"}
                onChange={updateState}
                value={username}
              />
            </SecondPart>
          </CompletePart>
          <CompletePart>
            <FirstPart>Bio</FirstPart>
            <SecondPart>
              <Textarea
                id="bio"
                name="bio"
                placeholder={"Bio"}
                value={bio}
                onChange={updateState}
              />
            </SecondPart>
          </CompletePart>
          <CompletePart>
            <FirstPart>Email</FirstPart>
            <SecondPart>
              <input
                id="email"
                name="email"
                placeholder={"Email"}
                onChange={updateState}
                value={email}
              />
            </SecondPart>
          </CompletePart>
          <CompletePart>
            <FirstPart>Phone Number</FirstPart>
            <SecondPart>
              <input
                id="phone"
                name="phone"
                type="number"
                placeholder={"Phone Number"}
                onChange={updateState}
                value={phone}
              />
            </SecondPart>
          </CompletePart>
          <CompletePart>
            <FirstPart>Gender</FirstPart>
            <SecondPart>
              <input
                id="gender"
                name="gender"
                placeholder={"Gender"}
                onChange={updateState}
                value={gender}
              />
            </SecondPart>
          </CompletePart>
          <CompletePart>
            <FirstPart></FirstPart>
            <SecondPart>
              <Buttons>
                <div onClick={goBack}>Cancel</div>
                <span onClick={handleSubmit}>Submit</span>
              </Buttons>
            </SecondPart>
          </CompletePart>
        </FormOuter>
      )}
    </Wrapper>
  );
});