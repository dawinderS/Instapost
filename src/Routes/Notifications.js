import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "rl-react-helmet";
import { useQuery } from "react-apollo-hooks";
import moment from "moment";
import { ME } from "../SharedQueries";
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
  img {
    border-radius: 50%;
    background-size: cover;
    margin-left: 0;
  }
`;
const EachCard = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 14px 18px;
  border-bottom: 1px solid #dbdbdb;
  img {
    border-radius: 0%;
    margin-left: auto;
  }
  div {
    margin-left: 13px;
    display: flex;
    align-items: center;
    span {
      font-size: 16px;
      font-weight: 500;
      color: #262626;
      margin-right: 4px;
    }
    h1 {
      font-size: 14px;
      font-weight: 400;
      line-height: 14px;
      color: #262626;
      margin-top: 2px;
    }
    p {
      font-size: 13px;
      color: #8e8e8e;
      margin-left: 5px;
    }
  }
  button {
    margin-left: auto;
  }
`;

export default () => {
  const { data , loading } = useQuery(ME);

  const getDate = (createdAt) => {
    let time = moment(createdAt).fromNow();
    let arr = time.split(" ");
    if (arr[0].includes("a") && arr[1].includes("few")) {
      return `1m`;
    } else if (arr[0].includes("a") && !arr[1].includes("month")) {
      return `1${arr[1][0]}`;
    } else if (arr[0].includes("a") && arr[1].includes("month")) {
      return `4w`;
    } else if (arr[1].includes("min")) {
      return `${arr[0]}m`;
    } else if (arr[1].includes("hour")) {
      return `${arr[0]}h`;
    } else if (arr[1].includes("day")) {
      return `${arr[0]}d`;
    } else if (arr[1].includes("week")) {
      return `${arr[0]}w`;
    } else if (arr[1].includes("month")) {
      return `${arr[0] * 4}w`;
    } else if (arr[1].includes("year")) {
      return `${arr[0]}y`;
    }
  };

  let follow_notifs, like_notifs, comment_notifs, all_notifs, notifs;
  if (!loading && data.me) {
    follow_notifs = data.me.followers;
    like_notifs = data.me.posts.map(post => post.likes);
    comment_notifs = data.me.posts.map(post => post.comments);
    all_notifs = [...follow_notifs, ...like_notifs[0], ...comment_notifs[0]];
    all_notifs.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt) );
    notifs = all_notifs.map(notif => {
      if (notif.user === undefined) {
        return (
          <EachCard key={notif.id}>
            <UserLink to={`/${notif.username}`}>
              <img width="36" height="36" src={notif.avatar} />
              <div>
                <span>{notif.username}</span>
                <h1>started following you.</h1>
                <p>{getDate(notif.createdAt)}</p>
              </div>
            </UserLink>
            <FollowButton id={notif.id} isFollowing={notif.isFollowing} />
          </EachCard>
        );
      } else if (notif.user.username !== data.me.username && notif.text === undefined) {
        return (
          <EachCard key={notif.id}>
            <UserLink to={`/${notif.user.username}`}>
              <img width="36" height="36" src={notif.user.avatar} />
              <div>
                <span>{notif.user.username}</span>
                <h1>liked your post.</h1>
                <p>{getDate(notif.createdAt)}</p>
              </div>
            </UserLink>
            <img width="36" height="36" src={notif.post.files[0].url} />
          </EachCard>
        );
      } else if (notif.user.username !== data.me.username) {
        return (
          <EachCard key={notif.id}>
            <UserLink to={`/${notif.user.username}`}>
              <img width="36" height="36" src={notif.user.avatar} />
              <div>
                <span>{notif.user.username}</span>
                <h1>commented on your post.</h1>
                <p>{getDate(notif.createdAt)}</p>
              </div>
            </UserLink>
            <img width="36" height="36" src={notif.post.files[0].url} />
          </EachCard>
        );
      }
    })
  };

  return (
    <Wrapper>
      <Helmet>
        <title>Instapost</title>
      </Helmet>
      {loading && <Loader />}
      {!loading && data.me && (
        <Holder>
          <h2>Notifications</h2>
          <SuggestedCard>
            {console.log(notifs)}
            {notifs}
          </SuggestedCard>
        </Holder>
      )}
    </Wrapper>
  );
};