import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-autosize-textarea";
import moment from "moment";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { HeartFull, HeartEmpty, Comment as CommentIcon } from "../Icons";

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
    height: 88vh;
  }
`;

const Header = styled.header`
  padding: 14px 16px;
  display: flex;
  align-items: center;
`;

const UserColumn = styled.div`
  margin-left: 14px;
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div`
  position: relative;
  // padding-bottom: 60%;
  padding-bottom: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  flex-shrink: 0;
  cursor: pointer;
  max-height: 608px;
  @media screen and (max-width: 770px) {
    width: 100%;
    height: auto;
    max-height: 50vh;
  }
`;

const File = styled.img`
  // max-width: 100%;
  width: 100%;
  // height: auto;
  height: 608px;
  position: absolute;
  top: 0;
  background-size: cover;
  background-position: center;
  opacity: ${(props) => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

const Button = styled.span`
  cursor: pointer;
`;

const Meta = styled.div`
  padding: 12px 16px 0px 16px;
  p {
    color: #8e8e8e;
    cursor: pointer;
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
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 93%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
  padding: 0;
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

const CommentHolder = styled.div`
  display: flex;
  height: 55px;
  align-items: center;
  border-top: rgba(var(--ce3, 239, 239, 239), 1) 1px solid;
  padding: 0px 16px;
  justify-content: space-between;
  p {
    color: #0095f6;;
    font-weight: 600;
    cursor: pointer;
  }
`;

export default ({
  user: { username, avatar },
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
}) => (
  <Post>
    {/* <Header>
      <Link to={`/${username}`}>
        <Avatar size="sm" url={avatar} />
      </Link>
      <UserColumn>
        <Link to={`/${username}`}>
          <FatText text={username} />
        </Link>
        <Location>{location}</Location>
      </UserColumn>
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
          <CommentIcon />
        </Button>
      </Buttons>
      <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
      <Caption>
        <Link to={`/${username}`}>
          <FatText text={username} /> 
        </Link>
        {caption}
      </Caption>
      {
        (comments.length + selfComments.length > 2) &&
       <p>View all {comments.length + selfComments.length} comments</p>
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
      <Textarea
        onKeyPress={onKeyPress}
        placeholder={"Add a comment..."}
        value={newComment.value}
        onChange={newComment.onChange}
      />
      <p id="postComment" onClick={onPostClick}>Post</p>

    </CommentHolder> */}
  </Post>
);
// const onTextEnter = () => {
//   const post = document.getElementById("postComment");
//   post.style.opacity = 1;
// };