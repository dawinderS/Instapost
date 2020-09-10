import React from "react";
import { Helmet } from "rl-react-helmet";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { ME, FEED_QUERY } from "../SharedQueries";
import Loader from "../Components/Loader";
import Post from "../Components/Post/index";
import Avatar from "../Components/Avatar";
import SuggestedCard from "../Components/SuggestionCard";
import { MessagingIcon, MessagingIconLoc, Logo } from "../Components/Icons";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  @media screen and (max-width: 770px) {
    width: 100%;
    min-height: 75vh;
    max-height: calc(100vh - 44px);
    justify-content: flex-start;
  }
`;

const PostShow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 610px;
  max-width: 610px;
  @media screen and (max-width: 770px) {
    width: 100%;
    min-width: 100%;
    max-height: calc(100vh - 88px);
  }
`;

const FeedSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 295px;
  position: fixed;
  margin-left: 640px;
  @media screen and (max-width: 770px) {
    display: none;
  }
`;

const UserFeed = styled.div`
  display: flex;
  height: 56px;
  margin: 23px 0px 21px 5px;
  align-items: center;
  p {
    margin-left: auto;
    font-size: 12px;
    font-weight: 600;
  }
`;

const UserLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const UserFeedText = styled.div`
  display: flex;
  margin-left: 15px;
  flex-direction: column;
  margin-top: 1px;
  div {
    color: #262626;
    font-weight: 600;
    margin-bottom: 6px;
    font-size: 14px;
  }
  span {
    font-size: 12px;
    line-height: 14px;
    color: #8e8e8e;
  }
`;

const Suggestions = styled.div`
  display: flex;
  flex-direction: column;
  span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: rgba(var(--f52,142,142,142),1);
    font-weight: 600;
    line-height: 18px;
    p {
      font-size: 12px;
      font-weight: 600;
      color: #262626;
    }
  }
`;

const MinHeader = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  /* border-bottom: ${(props) => props.theme.boxBorder}; */
  border-bottom: 1px solid #dbdbdb;
  border-radius: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px 16px;
  z-index: 2;
  height: 5.5vh;
  max-height: 44px;
  min-height: 44px;
  div {
    width: 10%;
    display: flex;
    justify-content: flex-end;
  }
  img {
    width: 80px;
    height: auto;
  }
  @media screen and (min-width: 770px) {
    display: none;
  }
`;

const MinLink = styled(Link)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Empty = styled.div`
  width: 65%;
  text-align: center;
  font-size: 24px;
  padding: 80px 0px 40px 0px;
  div {
    margin: 15px 0px 25px 0px;
  }
  @media screen and (max-width: 770px) {
    width: 100%;
    font-size: 20px;
  }
`;

export default withRouter(({ history }) => {
  const { data, loading } = useQuery(FEED_QUERY);
  const me = useQuery(ME);
  const pathname = history.location.pathname;
  
  return (
    <Wrapper>
      <Helmet>
        <title>Instapost</title>
      </Helmet>
      {loading && <Loader />}
      <MinHeader>
        <div></div>
        <MinLink to="/" replace>
          <img src="instalogo.png" alt="instalogo" />
        </MinLink>
        <Link to="/direct">
          {pathname.includes("/direct") ? <MessagingIconLoc /> : <MessagingIcon />}
        </Link>
      </MinHeader>
      {!loading &&
        data &&
        data.seeFeed &&
        me.data &&
        !me.loading &&
        me.data.me && (
          // suggested.data && !suggested.loading &&
          <>
            {data.seeFeed.length < 1 && (
              <Empty>
                <Logo size={60} />
                <div>Nothing in your feed right now</div>
                <Link to="/suggested">See suggested accounts to follow?</Link>
              </Empty>
            )}
            {data.seeFeed.length > 0 && (
              <PostShow>
                {" "}
                {data.seeFeed.map((post) => (
                  <Post
                    key={post.id}
                    id={post.id}
                    location={post.location}
                    caption={post.caption}
                    user={post.user}
                    me={me.data.me}
                    files={post.files}
                    likeCount={post.likeCount}
                    commentCount={post.commentCount}
                    isLiked={post.isLiked}
                    likes={post.likes}
                    comments={post.comments}
                    createdAt={post.createdAt}
                  />
                ))}
              </PostShow>
            )}
            <FeedSide>
              <UserFeed>
                <UserLink to={`/${me.data.me.username}`}>
                  <Avatar size="md" url={me.data.me.avatar} />
                  <UserFeedText>
                    <div>{me.data.me.username}</div>
                    <span>{me.data.me.name}</span>
                  </UserFeedText>
                </UserLink> 
                <p>
                  <Link to="/editprofile">
                    Edit Profile
                  </Link>
                </p>
              </UserFeed>
              <Suggestions>
                <span>
                  <span>Suggestions For You</span>
                  <Link to="/suggested">
                    <p>See All</p>
                  </Link>
                </span>
                <SuggestedCard />
              </Suggestions>
            </FeedSide>
          </>
        )}
    </Wrapper>
  );
});
