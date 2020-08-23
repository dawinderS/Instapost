import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import { SUGGESTED } from "../SharedQueries";
import FollowButton from "./FollowButton/index";

const SuggestedCard = styled.div`
  margin: 8px 0px 20px 4px;;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const UserLink = styled(Link)`
  display: flex;
`;
const EachCard = styled.div`
  display: flex;
  padding: 7px 0px;
  img {
    border-radius: 50%;
    background-size: cover;
  }
  div {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    align-items: space-between;
    span {
      font-size: 14px;
      font-weight: 600;
      color: #262626;
    }
    p {
      font-size: 12px;
      font-weight: 400;
      line-height: 14px;
      color: #8e8e8e;
    }
  }
  button {
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    color: #0095f6;
    padding: 0;
    margin: 0;
    margin-left: auto;
    background-color: transparent;
    text-align: right;
    width: 47px;
  }
`;

export default withRouter(() => {
  const { data, loading } = useQuery(SUGGESTED);

  return (
    <SuggestedCard>
      {!loading &&
        data.suggested &&
        data.suggested.slice(0, 5).map((user) => (
          <EachCard key={user.id}>
            <UserLink to={`/${user.username}`}>
              <img width="32" height="32" src={user.avatar} alt="instalogo" />
              <div>
                <span>{user.username}</span>
                <p>{user.name}</p>
              </div>
            </UserLink>
            <FollowButton id={user.id} isFollowing={user.isFollowing} />
          </EachCard>
        ))}
    </SuggestedCard>
  );
});