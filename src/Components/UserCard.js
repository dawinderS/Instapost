import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./FatText";
import FollowButton from "./FollowButton/index";

const Card = styled.div`
  ${(props) => props.theme.whiteBox}
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0px;
  width:100%;
  button {
    width: 75%;
  }
`;

const EAvatar = styled(Avatar)`
  margin-bottom: 10px;
`;

const ELink = styled(Link)`
  width: 100%;
  color: inherit;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  span {
    max-width: 75%;
    overflow-x: auto;
    ::-webkit-scrollbar {
      width: 0px; 
      background: transparent;
    }
  }
  p {
    margin-top: 5px;
    color: #8e8e8e;
    font-weight: 400;
    max-width: 75%;
    overflow-x: auto;
    ::-webkit-scrollbar {
      width: 0px; 
      background: transparent;
    }
    min-height: 14px;
  }
`;

const UserCard = ({ myId, id, name, username, isFollowing, url, isSelf }) => {
  return (
  <Card>
    <ELink to={`/${username}`}>
      <EAvatar url={url} size={"md"} />
      <FatText text={username} />
        {name && <p>{name}</p>}
        {!name && <p>{" "}</p>}
    </ELink>
    {!isSelf && <FollowButton myId={myId} id={id} isFollowing={isFollowing} />}
  </Card>
)};

UserCard.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  isSelf: PropTypes.bool.isRequired,
};

export default UserCard;