import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useMutation } from "react-apollo-hooks";
import TextareaAutosize from "react-autosize-textarea";
import moment from "moment";
import { HeartFull, HeartEmpty, Comment as CommentIcon, PostOptions } from "../Icons";
import FatText from "../FatText";
import Avatar from "../Avatar";
import FollowButton from "../FollowButton/index";
import { EDIT_POST } from "./PostQueries";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { FEED_QUERY, GET_USER_BY_ID } from "../../SharedQueries";

Modal.setAppElement("#root");

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

const Post = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  margin-bottom: 50px;
  user-select: none;
  a {
    color: inherit;
  }
  @media screen and (max-width: 770px) {
    margin: 0;
    border: none;
  }
`;

const Header = styled.header`
  width: 100%;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  p {
    margin-left: auto;
    height: 32px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
  }
`;

const UserColumn = styled.div`
  margin-left: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 32px;
`;

const UsernameLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const Location = styled.span`
  display: block;
  // margin-top: 3px;
  font-size: 12px;
`;

const Files = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 100%;
  height: auto;
`;

const File = styled.img`
  width: 100%;
  height: auto;
  max-height: 750px;
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 770px) {
    width: 100%;
    height: auto;
    min-height: 30vh;
    max-height: 70vh;
  }
`;

// const Files = styled.div`
//   position: relative;
//   // padding-bottom: 60%;
//   padding-bottom: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: stretch;
//   flex-shrink: 0;
//   cursor: pointer;
//   max-height: 608px;
//   @media screen and (max-width: 770px) {
//     width: 100%;
//     height: auto;
//     max-height: 50vh;
//     // display: none;
//   }
// `;


// const File = styled.img`
//   // max-width: 100%;
//   width: 100%;
//   // height: auto;
//   height: 608px;
//   position: absolute;
//   top: 0;
//   background-size: cover;
//   background-position: center;
//   opacity: ${(props) => (props.showing ? 1 : 0)};
//   transition: opacity 0.5s linear;
// `;

const Button = styled.span`
  cursor: pointer;
`;

const Meta = styled.div`
  padding: 12px 16px 0px 16px;
  p {
    color: #8e8e8e;
    cursor: pointer;
  }
  #viewcomments {
    margin: 0;
    padding: 0;
  }
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 16px;
    }
  }
  margin-bottom: 10px;
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.2px;
  display: block;
  color: rgba(var(--f52, 142, 142, 142), 1);
  font-size: 10px;
  margin: 8px 0px 0px 0px;
  padding-bottom: 12px;
  padding-top: 3px;
  @media screen and (max-width: 770px) {
    display: none;
  }
`;
const Timestamp2 = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.2px;
  display: block;
  color: #8e8e8e;
  font-size: 10px;
  padding: 0px 16px 10px 16px;
  @media screen and (min-width: 770px) {
    display: none;
  }
`;

const Comments = styled.ul`
  margin-top: 8px;
`;

const Comment = styled.li`
  margin-bottom: 7px;
  span {
    margin-right: 5px;
  }
`;

const Caption = styled.div`
  margin: 10px 0px 8px 0px;
  span {
    margin-right: 5px;
  }
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
  padding-bottom: 4px;
`;

const CommentHolder = styled.div`
  display: flex;
  min-height: 55px;
  align-items: center;
  border-top: rgba(var(--ce3, 239, 239, 239), 1) 1px solid;
  padding: 0px 16px;
  img {
    border-radius: 50%;
    background-size: cover;
    margin-right: 8px;
  }
  div {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 8px 0px;
    p {
      color: #0095f6;;
      font-weight: 600;
      cursor: pointer;
      opacity: 1;
      padding-left: 5px;
    }
    #postComment {
      opacity: 0.4;
      cursor: default;
    }
  }
  @media screen and (max-width: 770px) {
    min-height: 10px;
    border: none;
    padding: 3px 16px 10px 16px;
    div {
      border: .5px solid #dbdbdb;
      border-radius: 50px;
      padding: 6px 12px 6px 10px;
    }
  }
`;
const GoPostLink = styled(Link)`
  display:flex;
  align-items: center;
  width: 100%;
`;

const ModalWrapper = styled.div`
  width: 260px;
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
    line-height 24px;
    font-weight: 600;
    color: #262626;
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
    span {
      color: #8e8e8e;
      margin-right: 10px;
    }
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
    button {
      width: 100%;
      height: 100%;
      background-color: #fff;
      color: #ed4956;
    }
  }
  #profremove2 {
    color: #0095f6;
    font-size: 14px;
    font-weight: 700;
    button {
      width: 100%;
      height: 100%;
      background-color: #fff;
      color: #0095f6;
    }
  }
  #profcancel {
    color: #000000;
    font-size: 14px;
  }
`;
const ModalWrapper2 = styled.div`
  width: 310px;
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
    line-height 24px;
    font-weight: 600;
    color: #262626;
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
    span {
      color: #8e8e8e;
      margin-right: 10px;
    }
  }
  #captionedit {
    justify-content: flex-start;
    padding: 4px 15px;
  }
  #locationedit {
    justify-content: flex-start;
    padding: 4px 15px;
    input {
      border: none;
      outline: none;
    }
  }
  #profupload {
    color: #0095f6;
    font-size: 14px;
    font-weight: 700;
  }
  #profcancel {
    color: #000000;
    font-size: 14px;
  }
`;

export default ({
  // user: { id, username, avatar, isFollowing, isSelf },
  id,
  user,
  me,
  location,
  files,
  caption,
  isLiked,
  likeCount,
  commentCount,
  createdAt,
  newComment,
  currentItem,
  toggleLike,
  onKeyPress,
  onPostClick,
  comments,
  selfComments,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [captionInput, setCaptionInput] = useState(caption);
  const [locationInput, setLocationInput] = useState(location);
  
  const openModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  }

  const openDeleteModal = () => {
    setIsOpen(false);
    setDeleteModal(true);
  }
  const closeDeleteModal = () => {
    setDeleteModal(false);
  }
  const openEditModal = () => {
    setIsOpen(false);
    setEditModal(true);
  }
  const closeEditModal = () => {
    setEditModal(false);
  }

  const [editPostMutation] = useMutation(EDIT_POST, {
    refetchQueries: () => [
      { query: GET_USER_BY_ID, variables: { id: user.id } },
      { query: FEED_QUERY },
    ]
  });
  const [editPostMutation2] = useMutation(EDIT_POST);
  const DELETE = "DELETE";
  const EDIT = "EDIT";

  const deletePost = async (event) => {
    event.preventDefault();
    closeDeleteModal();
    try {
      const {
        data: { editPost }
      } = await editPostMutation({
        variables: { id, action: DELETE }
      });
      if (editPost) {
        toast.info("Post deleted successfully.");
      }
    } catch {
      toast.error("Cannot delete at the moment, please try later.");
    }
  };

  const updateState = (e) => {
    const value = e.target.value;
    switch (e.target.getAttribute("name")) {
      case "caption":
        setCaptionInput(value);
        break;
      case "location":
        setLocationInput(value);
        break;
      default:
        return;
    }
  };

  const editPostSubmit = async (event) => {
    event.preventDefault();
    closeEditModal();
    try {
      const {
        data: { editPost }
      } = await editPostMutation2({
        variables: { 
          id, 
          caption: captionInput, 
          location: locationInput, 
          action: EDIT }
      });
      if (editPost) {
        toast.info("Post edited successfully.");
      }
    } catch {
      toast.error("Cannot delete at the moment, please try later.");
    }
  };

  return (
  <Post>
    <Header>
      <Link to={`/${user.username}`}>
        <Avatar size="sm" url={user.avatar} />
      </Link>
      <UserColumn>
        <UsernameLink to={`/${user.username}`}>
          <FatText text={user.username} />
        </UsernameLink>
        {location && <Location>{location}</Location>}
      </UserColumn>
      <p onClick={openModal}><PostOptions /></p>
    </Header>
    <Files onDoubleClick={toggleLike}>
      {files &&
        files.map((file, index) => (
          <File key={file.id} src={file.url} showing={index === currentItem} />
        ))}
    </Files>
    <Meta>
      <Buttons>
        <Button onClick={toggleLike}>
          {isLiked ? <HeartFull /> : <HeartEmpty />}
        </Button>
        <Button>
          <Link to={`p/${id}`}>
            <CommentIcon />
          </Link>
        </Button>
      </Buttons>
      <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
      <Caption>
        <Link to={`/${user.username}`}>
          <FatText text={user.username} /> 
        </Link>
        {caption}
      </Caption>
      {
        (comments.length + selfComments.length > 2) &&
        <Link to={`p/${id}`}>
          <p id="viewcomments">View all {comments.length + selfComments.length} comments</p>
        </Link>
      }
      {comments && (
        <Comments>
          {comments.slice(-2).map((comment) => (
            <Comment key={comment.id}>
              <Link to={`/${comment.user.username}`}>
                <FatText text={comment.user.username} />
              </Link>
              {comment.text}
            </Comment>
          ))}
          {selfComments.map((comment) => (
            <Comment key={comment.id}>
              <Link to={`/${comment.user.username}`}>
                <FatText text={comment.user.username} />
              </Link>
              {comment.text}
            </Comment>
          ))}
        </Comments>
      )}
      <Timestamp>{moment(createdAt).fromNow()}</Timestamp>
    </Meta>
    <CommentHolder>
      <img src={me.avatar} width="26" height="26" />
      <div>
        <Textarea
          onKeyPress={onKeyPress}
          placeholder={`Add a comment...`}
          value={newComment.value}
          onChange={newComment.onChange}
        />
        {newComment.value.length < 1 && <p id="postComment">Post</p>}
        {newComment.value.length > 0 && <p onClick={onPostClick}>Post</p>}
      </div>
    </CommentHolder>
    <Timestamp2>{moment(createdAt).fromNow()}</Timestamp2>
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Post Modal"
    >
      <ModalWrapper>
        {user.isSelf ? (
        <>
          <div onClick={openDeleteModal} id="profremove">
            Delete
          </div>
          <div onClick={openEditModal} id="profupload">
            Edit
          </div>
          <GoPostLink to={`p/${id}`}>
            <div id="profcancel">
              Go to post
            </div>
          </GoPostLink>
          <div onClick={closeModal} id="profcancel">
            Cancel
          </div>
        </>
        ) : (
        <>
          {user.isFollowing &&
            <div onClick={closeModal} id="profremove">
              <FollowButton myId={me.id} id={user.id} isFollowing={user.isFollowing} />
            </div>
          }
          {!user.isFollowing &&
            <div id="profremove2">
              <FollowButton myId={me.id} id={user.id} isFollowing={user.isFollowing} />
            </div>
          }
          <GoPostLink to={`p/${id}`}>
            <div id="profcancel">
              Go to post
            </div>
          </GoPostLink>
          <div onClick={closeModal} id="profcancel">
            Cancel
          </div>
        </>
        )}
      </ModalWrapper>
    </Modal>
    <Modal
      isOpen={deleteModal}
      onRequestClose={closeDeleteModal}
      style={customStyles}
      contentLabel="Post Modal"
    >
      <ModalWrapper>
        <h1>Delete Post?</h1>
        <div onClick={deletePost} id="profremove">
          Delete
        </div>
        <div onClick={closeDeleteModal} id="profcancel">
          Cancel
        </div>
      </ModalWrapper>
    </Modal>
    <Modal
      isOpen={editModal}
      onRequestClose={closeEditModal}
      style={customStyles}
      contentLabel="Post Modal"
    >
      <ModalWrapper2>
        <h1>Edit Post</h1>
        <div id="captionedit">
          <span>Caption:</span>
          <Textarea
            id="caption"
            name="caption"
            placeholder={"Write a caption..."}
            onChange={updateState}
            value={captionInput}
          />
        </div>
        <div id="locationedit">
          <span>Location:</span>
          <input
            id="location"
            name="location"
            placeholder={"Add a location..."}
            onChange={updateState}
            value={locationInput}
          />
        </div>
        <div onClick={editPostSubmit} id="profupload">
          Submit
        </div>
        <div onClick={closeEditModal} id="profcancel">
          Cancel
        </div>
      </ModalWrapper2>
    </Modal>
  </Post>
)};