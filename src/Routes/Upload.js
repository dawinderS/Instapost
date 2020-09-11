import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Helmet } from "rl-react-helmet";
import styled, { keyframes } from "styled-components";
import { gql } from "apollo-boost";
import useInput from "../Hooks/useInput";
import { useQuery, useMutation } from "react-apollo-hooks";
import { ME, FEED_QUERY, GET_USER } from "../SharedQueries";
import { toast } from "react-toastify";
import Input from "../Components/Input";
import TextareaAutosize from "react-autosize-textarea";
import { UploadPicture, HeaderBackButton } from "../Components/Icons";

const UPLOAD = gql`
  mutation upload($caption: String!, $files: [String!]!, $location: String) {
    upload(caption: $caption, files: $files, location: $location) {
      id
      caption
      location
    }
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
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
  border-left: none;
  border-right: none;
  font-size: 14px;
  line-height: 18px;
  padding: 12px 15px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

const UploadWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: white;
  text-align: center;
  overflow-y: scroll;
  @media screen and (max-width: 770px) {
    padding-bottom: 20px;
    overflow-y: scroll;
  }
  img {
    opacity: 0;
    max-width: 100%;
    // min-width: 80vw;
    // width: 100vw;
    // min-width: 100vw;
    width: auto;
    max-height: 45vh;
    animation: ${fadeIn} 1s forwards;
    object-fit: cover;
    overflow: hidden;
    background-color: #fafafa;
    color: #262626;
    border-bottom: 1px solid #dbdbdb;
    @media screen and (min-width: 770px) {
      height: auto;
      max-height: 60vh;
      width: auto;
      max-width: 100%;
      min-width: 100%;
      // min-width: 400px;
    }
  }
  .imageWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    // height: 400px;
    // width: 80vw;
    // max-width: 100%;
  }
  .labelWrapper {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-flow: column;
    height: 80vw;
    max-height: 380px;
    width: 80vw;
    max-width: 380px;
    p {
      margin-bottom: 30px;
      font-size: 30px;
      font-weight: 600;
    }
  }
  & svg {
    margin: 0 auto;
    fill: #262626;
  }
  button {
    background-color: #0095f6;
    font-weight: bold;
    color: white;
    border: none;
    width: 100%;
    margin: 0px 20px;
    height: 40px;
    margin: 0;
    cursor: pointer;
    outline: none;
    font-size: 14px;
  }
  .fileUploader {
    width: 100%;
    left: calc(50% - 306);
  }
  .fileContainer {
    height: 30px;
    box-shadow: none;
    margin: 0;
    padding: 0;
    border-radius: 0;
  }
  .goback-button {
    color: grey;
    background-color: white;
    border: none;
    @media screen and (max-width: 770px) {
      display: none;
    }
  }
  @media screen and (min-width: 770px) {
    margin: 10px auto;
    border: 1px solid #dfdfdf;
    width: 500px;
    border-radius: 3px;
  }
  .custom-file-input {
    color: transparent;
    height: 40px;
    font-size: 14px;
  }
  .custom-file-input2 {
    color: transparent;
    display:flex;
    align-items: center;
    // height: 40px;
    font-size: 14px;
    margin: 0;
    width: 50%;
    @media screen and (max-width: 770px) {
      border: 1px solid #dbdbdb;
    }
  }

  .custom-file-input::-webkit-file-upload-button {
    visibility: hidden;
  }
  .custom-file-input2::-webkit-file-upload-button {
    visibility: hidden;
  }
  .custom-file-input::before {
    display: flex;
    justify-content: center;
    align-items: center;
    content: "Select Photo";
    color: white;
    height: 40px;
    background: #0095f6;
    outline: none;
    white-space: nowrap;
    cursor: pointer;
    font-weight: 700;
  }
  .custom-file-input2::before {
    display: flex;
    justify-content: center;
    align-items: center;
    content: "Change Photo";
    color: grey;
    height: 40px;
    background: #fff;
    outline: none;
    white-space: nowrap;
    cursor: pointer;
    font-weight: 700;
  }
  .custom-file-input:active {
    outline: 0;
  }
  .custom-file-input:active::before {
    background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
  }
  .custom-file-2:active {
    outline: 0;
  }
  .custom-file-input2:active::before {
    background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
  }
`;

const BeforeBtns = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  margin-top: 15px;
  border-top: 1px solid #dbdbdb;
  button {
    width: 50%;
    margin: 0;
    padding: 0;
  }
  input {
    width: 50%;
    margin: 0;
    padding: 0;
    @media screen and (max-width: 770px) {
      width: 100%;
      border-radius: 3px;
    }
  }
  @media screen and (max-width: 770px) {
    width: 80%;
  }
`;
const BeforeBtns2 = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  margin-top: 15px;
  border-top: 1px solid #dbdbdb;
  button {
    width: 50%;
    margin: 0;
    padding: 0;
    height: 44px;
  }
  input {
    width: 50%;
    margin: 0;
    padding: 0;
  }
  @media screen and (max-width: 770px) {
    margin-top: 25px;
    border: none;
  }
`;

const MinHeader = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  /* border-bottom: ${(props) => props.theme.boxBorder}; */
  border-bottom: 1px solid #dbdbdb;
  border-radius: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 16px;
  z-index: 2;
  height: 5.5vh;
  max-height: 44px;
  min-height: 44px;
  svg {
    margin: 0;
    transform: rotate(270deg);
  }
  div {
    font-size: 17px;
    font-weight: 600;
    text-align: center;
  }
  span {
    font-size: 16px;
    font-weight: 600;
    width: 20%;
    display: flex;
    p {
      margin-left: auto;
      color: #0095f6;
    }
  }
  @media screen and (min-width: 770px) {
    display: none;
  }
`;

const InputHolder = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  width: 100%;
  input {
    margin-top: 15px;
    width: 100%;
    background-color: #fff;
    border-radius: 0;
    border-left: none;
    border-right: none;
    height: 44px;
    font-size: 14px;
    line-height: 18px;
    padding: 0px 15px;
  }
  @media screen and (max-width: 770px) {
    background-color: #fff;
  }
`;

export default ({ props }) => {
  const [loading, setIsLoading] = useState(false);
  const [picture, setPicture] = useState(null);
  const [imagePreview, setImagePreview] = useState();
  const captionInput = useInput("");
  const locationInput = useInput("");
  const history = useHistory();
  const me = useQuery(ME);
  const [uploadMutation] = useMutation(UPLOAD, {
    refetchQueries: () => [
      { query: FEED_QUERY }, 
      { query: GET_USER, variables: { username: me.data.me.username } }
    ],
  });

  const onDrop = (e) => {
    setPicture(e.target.files[0]);
    if (e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };
  
  const goBack = (e) => {
    history.push("/");
  };
  const returnBack = (e) => {
    history.goBack();
  };


  const handleSubmit = async () => {
    if (captionInput.value === "") {
      toast.error("A caption is required.");
      return;
    }
    const formData = new FormData();
    formData.append("file", picture);

    try {
      setIsLoading(true);
      const {
        data: { location },
      } = await axios.post("http://localhost:4000/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      const {
        data: { upload },
      } = await uploadMutation({
        variables: {
          files: [location],
          caption: captionInput.value,
          location: locationInput.value,
        },
      });
      if (upload.id) {
        goBack();
      }
    } catch (e) {
      toast.error("Cannot upload, pleast try later");
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UploadWrapper>
      <Helmet>
        <title>Upload • Instapost</title>
      </Helmet>
      <MinHeader>
        <span onClick={returnBack}>
          <HeaderBackButton />
        </span>
        <div>New Post</div>
        {!picture && <span>{/* <p onClick={onDrop}>Select</p> */}</span>}
        {picture && (
          <span>
            <p onClick={handleSubmit}>Share</p>
          </span>
        )}
      </MinHeader>
      <div className="imageWrapper">
        {!picture ? (
          <div className="labelWrapper">
            <p>Share a new post</p>
            <UploadPicture size={140} />
          </div>
        ) : (
          <img src={imagePreview} draggable={false} alt="User's Upload" />
        )}
      </div>
      {picture ? (
        <InputHolder>
          {/* <Input
            className="captionInput"
            placeholder={"Write a caption..."}
            {...captionInput}
          /> */}
          <Textarea
            placeholder={"Write a caption..."}
            value={captionInput.value}
            onChange={captionInput.onChange}
            autoFocus
          />
          <Input placeholder={"Add Location"} {...locationInput} />
          <BeforeBtns2>
            <input
              className="custom-file-input2"
              type="file"
              multiple={false}
              accept=".jpg, .gif, .png, .gif"
              onChange={onDrop}
            />
            <button onClick={handleSubmit}>Share</button>
          </BeforeBtns2>
        </InputHolder>
      ) : null}
      {!picture && (
        <BeforeBtns>
          <button className="goback-button" onClick={goBack}>
            Cancel
          </button>
          <input
            className="custom-file-input"
            type="file"
            multiple={false}
            accept=".jpg, .gif, .png, .gif"
            onChange={onDrop}
          />
        </BeforeBtns>
      )}
    </UploadWrapper>
  );
};