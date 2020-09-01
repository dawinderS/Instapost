import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "rl-react-helmet";
import { useQuery } from "react-apollo-hooks";
import moment from "moment";
import { ME } from "../SharedQueries";
import FollowButton from "../Components/FollowButton/index";
import Loader from "../Components/Loader";
import { FollowUsers, NextButton } from "../Components/Icons";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 35px 0px;
  max-width: 100%;
  @media screen and (max-width: 770px) {
    margin: 0px;
    width: 100%
  }
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
  @media screen and (max-width: 770px) {
    width: 100%;
    min-height: 89vh;
    max-height: 89vh;
    overflow-y: auto;
  }
`;

const SuggestedFollowers = styled.div`
  display: flex;
  width: 100%;
  padding: 14px 20px;
  border-bottom: 1px solid #dbdbdb;
  align-items: center;
`;

const SuggestedLink = styled(Link)`
  color: #262626;
  font-size: 16px;
  span {
    margin-left: 15px;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    span {
      margin: 0;
      margin-top: 5px;
      font-weight: 400;
      font-size: 14px;
      color: #8e8e8e;
    }
  }
  div {
    margin-left: auto;
  }
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
const NameLink = styled(Link)`
  font-weight: 600;
  color: #262626;
  margin-right: 4px;
`;

const EachCard = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 14px 20px;
  border-bottom: 1px solid #dbdbdb;
  img {
    border-radius: 0%;
  }
  span {
    margin-left: 12px;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: #262626;
    margin-right: 20px;
    .textholder {
      margin: 0;
      font-weight: 400;
      line-height: 14px;
      color: #262626;
    }
    .notif-date {
      font-size: 13px;
      color: #8e8e8e;
      margin: 0;
    }
  }
  button {
    margin-left: auto;
    width: 80px;
    min-width: 80px;
  }
  @media screen and (max-width: 770px) {
    padding: 10px 15px;
    border: none;
    img {
      height: 44px;
      width: 44px;
    }
    span {
      font-size: 14px;
    }
  }
`;
const ImgLink = styled(Link)`
  margin-left: auto;
`;
const MinHeader = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  border-bottom: ${(props) => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 11px 0px;
  z-index: 2;
  height: 6vh;
  max-height: 44px;
  min-height: 44px;
  div {
    font-size: 17px;
    font-weight: 600;
    text-align: center;
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
    notifs = all_notifs.slice(0, 50).map(notif => {
      if (notif.user === undefined) {
        return (
          <EachCard key={notif.id}>
            <UserLink to={`/${notif.username}`}>
              <img width="36" height="36" src={notif.avatar} />
            </UserLink>
            <span>
              <NameLink to={`/${notif.username}`}>{notif.username}</NameLink>
              <span className="textholder">
                started following you. <span className="notif-date">{getDate(notif.createdAt)}</span>
              </span>
            </span>
            <FollowButton myId={data.me.id} id={notif.id} isFollowing={notif.isFollowing} />
          </EachCard>
        );
      } else if (notif.user.username !== data.me.username && notif.text === undefined) {
        return (
          <EachCard key={notif.id}>
            <UserLink to={`/${notif.user.username}`}>
              <img width="36" height="36" src={notif.user.avatar} />
            </UserLink>
            <span>
              <NameLink to={`/${notif.user.username}`}>{notif.user.username}</NameLink>
              <span className="textholder">
                liked your post.{" "}
                <span className="notif-date">{getDate(notif.createdAt)}</span>
              </span>
            </span>
            <ImgLink to={`/p/${notif.post.id}`}>
              <img width="36" height="36" src={notif.post.files[0].url} />
            </ImgLink>
          </EachCard>
        );
      } else if (notif.user.username !== data.me.username) {
        return (
          <EachCard key={notif.id}>
            <UserLink to={`/${notif.user.username}`}>
              <img width="36" height="36" src={notif.user.avatar} />
            </UserLink>
            <span>
              <NameLink to={`/${notif.user.username}`}>
                {notif.user.username}
              </NameLink>
              <span className="textholder">
                commented on your post.{" "}
                <span className="notif-date">{getDate(notif.createdAt)}</span>
              </span>
            </span>
            <ImgLink to={`/p/${notif.post.id}`}>
              <img width="36" height="36" src={notif.post.files[0].url} />
            </ImgLink>
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
      <MinHeader>
        <div>Notifications</div>
      </MinHeader>
      {loading && <Loader />}
      {!loading && data.me && (
        <Holder>
          <h2>Notifications</h2>
          <SuggestedCard>
            <SuggestedLink to="/suggested">
              <SuggestedFollowers>
                <FollowUsers size={40} />
                <span>
                  Suggestions for you<span>Follow new users</span>
                </span>
                <div>
                  <NextButton />
                </div>
              </SuggestedFollowers>
            </SuggestedLink>
            {notifs.length < 1 && <Empty>No new notifications</Empty>}
            {notifs}
          </SuggestedCard>
        </Holder>
      )}
    </Wrapper>
  );
};