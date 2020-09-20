import React, { useState, useEffect } from "react";
import { Helmet } from "rl-react-helmet";
import { withRouter, useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "react-apollo-hooks";
import TextareaAutosize from "react-autosize-textarea";
import { ME, GET_USER_BY_ID } from "../../SharedQueries";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";
import Modal from "react-modal";

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    padding: "0",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: "20",
  },
};

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
  font-size: 14px;
  line-height: 18px;
  padding: 5px 10px;
  min-height: 100px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  resize: none;
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 770px) {
    margin: 0;
    border: none;
    padding: 0;
    min-height: 36px;
    min-height: 10px;
    color: #262626;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: 75vh;
  /* max-height: 89vh; */
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

const FormOuter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 700px;
  min-height: 70vh;
  max-height: 85vh;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  padding: 35px;
  @media screen and (max-width: 770px) {
    display: none;
  }
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
  img {
    border-radius: 50%;
    background-size: cover;
    cursor: pointer;
  }
  span {
    font-size: 30px;
    font-weight: 300;
    padding-bottom: 10px;
    margin-bottom: 5px;
    border-bottom: 1px solid #dbdbdb;
  }
`;

const SecondPart = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  h1 {
    font-size: 20px;
    line-height: 22px;
    font-weight: 400;
    margin-bottom: 5px;
  }
  p {
    width:50%;
    color: #0095f6;
    font-size: 14px;
    line-height: 18px;
    font-weight: 600;
    cursor: pointer;
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

const MinMiddle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px 0px;

  @media screen and (min-width: 770px) {
    display: none;
  }
`;

const MinPicShow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    border-radius: 50%;
    background-size: cover;
    cursor: pointer;
  }
  p {
    color: #0095f6;
    font-size: 14px;
    line-height: 18px;
    font-weight: 500;
    cursor: pointer;
    margin: 10px 0px 15px 0px;
  }
`;

const MinInputs = styled.div`
  width: 100%;
  display: flex;
  padding: 0px 15px;
  flex-direction: column;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
`;

const BothInputs = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  #no-border {
    border: none;
  }
`;

const LeftInput = styled.div`
  display: flex;
  width: 30%;
  padding: 12px 0px;
  align-items: center;
  font-size: 15px;
  font-weight: 400;
  color: #262626;
`;
const RightInput = styled.div`
  display: flex;
  width: 70%;
  padding: 12px 0px;
  border-bottom: 1px solid #dbdbdb;
  input {
    display: flex;
    align-items: center;
    width: 100%;
    color: #262626;
    font-size: 15px;
    font-weight: 400;
    line-height: 18px;
    outline: none;
    border: none;
    padding: 0;
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

const RandomText = styled.div`
  font-size: 15px;
  font-weight: 600;
  padding: 15px 0px;
  border-top: 1px solid #dbdbdb;
`;

const ModalWrapper = styled.div`
  width: 90vw;
  @media screen and (min-width: 735px) {
    width: 400px;
  }
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  h1 {
    width: 100%;
    margin: 24px 0px 24px 0px;
    text-align: center;
    font-size: 18px;
    line-height: 24px;
    font-weight: 600;
    color: #262626;
  }
  #uploadbtn {
    display: none;
  }
  #uploadbtnlabel {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-top: 1px solid #dbdbdb;
    cursor: pointer;
    min-height: 48px;
    padding: 4px 0px;
    text-align: center;
  }
  #profupload {
    color: #0095f6;
    font-size: 14px;
    font-weight: 700;
  }
  #profremove {
    color: #ed4956;
    font-size: 14px;
    font-weight: 700;
  }
  #profcancel {
    color: #000000;
    font-size: 14px;
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
  const [modalIsOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const { data, loading } = useQuery(ME);
  const [editUserMutation] = useMutation(EDITUSER, {
    refetchQueries: () => [
      {
        query: GET_USER_BY_ID,
        variables: { id: data.me.id },
      },
    ],
  });
  
  const goBack = (e) => {
    history.push(`/${username}`);
  };

  const openModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  }

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
    try {
      setLoadingA(true);

      const {
        data: { editUser },
      } = await editUserMutation({
        variables: {
          name, username, bio, email, phone: parseInt(phone), gender
        },
      });
      if (editUser) {
        history.push(`/${editUser.username}`);
      }
    } catch (e) {
      if (e.message.split(' ').includes("unique")) {
        toast.error("The new username or email you have provided is already in use.")
      } else {
        toast.error("Cannot update profile, please try again.");
      }
    } finally {
      setLoadingA(false);
    }
  };

  const addProfPic = async (e) => {
    const pic = e.currentTarget.files[0];
    let formData;
    if (pic) {
      formData = new FormData();
      formData.append("file", pic);
    }

    try {
      const {
        data: { location },
      } = await axios.post(
        "http://instapost-backend.herokuapp.com/api/upload", 
        formData, 
        {
          headers: {
            "content-type": "multipart/form-data",
          },
      });
      const {
        data: { editUser },
      } = await editUserMutation({
        variables: { avatar: location },
      });
      if (editUser) {
        closeModal();
      } else {
        toast.error("Cannot update at this time please try again.");
      }
    } catch (e) {
      toast.error("Cannot update profile picture, please try again.");
      console.log(e);
    }
  };

  const removeProfPic = async () => {
    try {
      const { data: { editUser }, } = await editUserMutation({
        variables: { avatar: "https://instapost-clone.s3-us-west-1.amazonaws.com/1597009545181" }
      });
      if (editUser) {
        closeModal();
      } else {
        toast.error("Cannot update at this time please try again.");
      }
    } catch (e) {
      toast.error("Cannot update profile picture, please try again.");
      console.log(e);
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
        <MinMiddle>
          <MinPicShow>
            <img
              onClick={openModal}
              src={data.me.avatar}
              width="90"
              height="90"
              alt="avatar"
            />
            <p onClick={openModal}>Change Profile Photo</p>
          </MinPicShow>
          <MinInputs>
            <BothInputs>
              <LeftInput>Name</LeftInput>
              <RightInput>
                <input
                  id="name"
                  name="name"
                  placeholder={"Name"}
                  onChange={updateState}
                  value={name}
                />
              </RightInput>
            </BothInputs>
            <BothInputs>
              <LeftInput>Username</LeftInput>
              <RightInput>
                <input
                  id="username"
                  name="username"
                  placeholder={"Username"}
                  onChange={updateState}
                  value={username}
                />
              </RightInput>
            </BothInputs>
            <BothInputs>
              <LeftInput>Bio</LeftInput>
              <RightInput id="no-border">
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder={"Bio"}
                  value={bio}
                  onChange={updateState}
                />
              </RightInput>
            </BothInputs>
            <RandomText>Private information</RandomText>
            <BothInputs>
              <LeftInput>Email</LeftInput>
              <RightInput>
                <input
                  id="email"
                  name="email"
                  placeholder={"Email"}
                  onChange={updateState}
                  value={email}
                />
              </RightInput>
            </BothInputs>
            <BothInputs>
              <LeftInput>Phone</LeftInput>
              <RightInput>
                <input
                  id="phone"
                  name="phone"
                  type="number"
                  placeholder={"Phone Number"}
                  onChange={updateState}
                  value={phone}
                />
              </RightInput>
            </BothInputs>
            <BothInputs>
              <LeftInput>Gender</LeftInput>
              <RightInput id="no-border">
                <input
                  id="gender"
                  name="gender"
                  placeholder={"Gender"}
                  onChange={updateState}
                  value={gender}
                />
              </RightInput>
            </BothInputs>
          </MinInputs>
        </MinMiddle>
      )}
      {!loading && data.me && (
        <FormOuter>
          <CompletePart>
            <FirstPart>
              <span>Edit Profile</span>
            </FirstPart>
          </CompletePart>
          <CompletePart>
            <FirstPart>
              <img
                onClick={openModal}
                src={data.me.avatar}
                width="60"
                height="60"
                alt="avatar"
              />
            </FirstPart>
            <SecondPart>
              <h1>{data.me.username}</h1>
              <p onClick={openModal}>Change Profile Photo</p>
            </SecondPart>
          </CompletePart>
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ModalWrapper>
          <h1>Change Profile Photo</h1>
          <div id="profupload">
            <label htmlFor="uploadbtn" id="uploadbtnlabel">
              <input
                accept="image/*"
                type="file"
                onChange={addProfPic}
                id="uploadbtn"
              />
              Upload Photo
            </label>
          </div>
          <div onClick={removeProfPic} id="profremove">
            Remove Current Photo
          </div>
          <div onClick={closeModal} id="profcancel">
            Cancel
          </div>
        </ModalWrapper>
      </Modal>
    </Wrapper>
  );
});