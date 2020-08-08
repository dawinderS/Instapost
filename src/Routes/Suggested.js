import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "rl-react-helmet";
import { useQuery } from "react-apollo-hooks";
import { SUGGESTED } from "../SharedQueries";
import FollowButton from "../Components/FollowButton/index";
import Loader from "../Components/Loader";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 35px 0px;
  max-width: 100%;
`;

const Holder = styled.div`
  display: flex;
  flex-direction: column;
  h2 {
    padding: 0px 12px;
    font-size: 22px;
    line-height: 24px;
    font-weight: 600;
    font-color: #262626;
    margin-bottom: 15px;
  }
`;

const SuggestedCard = styled.div`
  width: 500px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 0px;
  border-radius: 4px;
  max-height: 75vh;
  overflow-y: scroll;
`;

const UserLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    border-radius: 50%;
    background-size: cover;
  }
`;
const EachCard = styled.div`
  display: flex;
  align-items: center;
  padding: 14px 18px;
  border-bottom: 1px solid #dbdbdb;
  img {
    border-radius: 50%;
    background-size: cover;
  }
  div {
    margin-left: 13px;
    display: flex;
    flex-direction: column;
    span {
      font-size: 14px;
      font-weight: 600;
      color: #262626;
      margin-bottom: 3px;
    }
    h1 {
      font-size: 14px;
      font-weight: 400;
      line-height: 14px;
      color: #8e8e8e;
      margin-bottom: 5px;
    }
    p {
      font-size: 12px;
      color: #8e8e8e;
    }
  }
  button {
    margin: 0;
    margin-left: auto;
  }
`;

export default () => {
  const { data, loading } = useQuery(SUGGESTED);

  return (
    <Wrapper>
      <Helmet>
        <title>Instapost</title>
      </Helmet>
      {loading && <Loader />}
      {!loading && data.suggested &&
      <Holder>
        <h2>Suggested</h2>
        <SuggestedCard>
          {
            data.suggested.map((user) => (
              <EachCard key={user.id} >
                <UserLink to={`/${user.username}`}>
                  <img width="46" height="46" src={user.avatar} />
                  <div>
                    <span>{user.username}</span>
                    <h1>{user.name}</h1>
                    <p>Suggested for you</p>
                  </div>
                </UserLink>
                <FollowButton id={user.id} isFollowing={user.isFollowing} />
              </EachCard>
            ))
          }
        </SuggestedCard>
      </Holder>
      }
    </Wrapper>
  );
};