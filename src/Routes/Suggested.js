import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "rl-react-helmet";
import { useQuery } from "react-apollo-hooks";
import { SUGGESTED, ME } from "../SharedQueries";
import FollowButton from "../Components/FollowButton/index";
import Loader from "../Components/Loader";
import { HeaderBackButton } from "../Components/Icons";


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 35px 0px;
  max-width: 100%;
  @media screen and (max-width: 770px) {
    width: 100%;
    margin: 0;
  }
`;

const Holder = styled.div`
  display: flex;
  flex-direction: column;
  h2 {
    padding: 0px 8px;
    font-size: 22px;
    line-height: 24px;
    font-weight: 600;
    font-color: #262626;
    margin-bottom: 15px;
  }
  @media screen and (max-width: 770px) {
    width: 100%;
    h2 {
      display: none;
    }
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
  .suggesttext {
    display: none;
  }
  @media screen and (max-width: 770px) {
    width: 100%;
    border: none;
    min-height: 88vh;
    max-height: 88vh;
    overflow-y: auto;
    .suggesttext {
      display: flex;
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      padding: 12px 14px 12px 14px;
    }
  }
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
  @media screen and (max-width: 770px) {
    border: none;
    padding: 8px 16px;
    img {
      height: 44px;
      width: 44px;
    }
  }
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

const Empty = styled.div`
  width: 100%;
  text-align: center;
  font-size: 20px;
  padding: 40px 0px;
`;

export default () => {
  const { data, loading } = useQuery(SUGGESTED);
  const me = useQuery(ME);
  const history = useHistory();
  const goBack = (e) => {
    history.goBack();
  };

  return (
    <Wrapper>
      <Helmet>
        <title>Instapost</title>
      </Helmet>
      <MinHeader>
        <span onClick={goBack}>
          <HeaderBackButton />
        </span>
        <div>Discover People</div>
        <span></span>
      </MinHeader>
      {loading && me.loading && <Loader />}
      {!loading && data.suggested && me.data && (
        <Holder>
          <h2>Suggested</h2>
          <SuggestedCard>
            <div className="suggesttext">Suggested</div>
            {data.suggested.length < 1 && <Empty>No new suggestions</Empty>}
            {data.suggested.map((user) => (
              <EachCard key={user.id}>
                <UserLink to={`/${user.username}`}>
                  <img alt="avatar" width="46" height="46" src={user.avatar} />
                  <div>
                    <span>{user.username}</span>
                    <h1>{user.name}</h1>
                    <p>Suggested for you</p>
                  </div>
                </UserLink>
                <FollowButton myId={me.data.me.id} id={user.id} isFollowing={user.isFollowing} />
              </EachCard>
            ))}
          </SuggestedCard>
        </Holder>
      )}
    </Wrapper>
  );
};