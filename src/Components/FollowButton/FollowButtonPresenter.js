import React from "react";
import Button from "../Button";
import styled from "styled-components";

const FollowingButton = styled(Button)`
  // button {
  //   background-color: #fff;
  // }
`;

export default ({ isFollowing, onClick }) => {
  return (
    <FollowingButton text={isFollowing ? "Unfollow" : "Follow"} onClick={onClick} />
  )
};