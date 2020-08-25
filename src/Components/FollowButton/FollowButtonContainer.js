import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import { GET_USER_BY_ID, SUGGESTED } from '../../SharedQueries';
import { FOLLOW, UNFOLLOW } from "./FollowButtonQueries";
import FollowButtonPresenter from "./FollowButtonPresenter";
import { toast } from "react-toastify";

const FollowButtonContainer = ({ isFollowing, id, myId }) => {
  const [isFollowingS, setIsFollowing] = useState(isFollowing);
  const [followMutation] = useMutation(FOLLOW, {
    refetchQueries: () => [
      { query: GET_USER_BY_ID, variables: { id: myId } },
      { query: SUGGESTED },
    ],
  });
  const [unfollowMutation] = useMutation(UNFOLLOW, {
    refetchQueries: () => [
      { query: GET_USER_BY_ID, variables: { id: myId } },
      { query: SUGGESTED },
    ],
  });

  const onClick = async () => {
    if (isFollowingS === true) {
      setIsFollowing(false);
      try {
        const { data } = await unfollowMutation({
          variables: { id }
        });
        if (data) return;
      } catch(e) {
        toast.error("Please try again.")
      } 
    } else {
      setIsFollowing(true);
      try {
        const { data } = await followMutation({
          variables: { id }
        });
        if (data) return;
      } catch (e) {
        toast.error("Please try again.")
      } 
    }
  };
  return <FollowButtonPresenter onClick={onClick} isFollowing={isFollowingS} />;
};

FollowButtonContainer.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default FollowButtonContainer;