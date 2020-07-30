import React from "react";
import { Helmet } from "rl-react-helmet";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { ME, SUGGESTED } from "../SharedQueries";
import Loader from "../Components/Loader";
import Post from "../Components/Post/index";
import Avatar from "../Components/Avatar";

const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 80vh;
`;

const PostShow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 610px;
`;

const FeedSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 295px;
  position: fixed;
  left: 750px;
`;

const UserFeed = styled.div`
  display: flex;
  height: 56px;
  margin: 23px 0px 30px 5px;
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

export default () => {
  const { data, loading } = useQuery(FEED_QUERY);
  const me = useQuery(ME);
  const suggested = useQuery(SUGGESTED);
  
  return (
    <Wrapper>
      <Helmet>
        <title>Instapost</title>
      </Helmet>
      {loading && <Loader />}
      {!loading &&
        data && data.seeFeed &&
        me.data && !me.loading &&
        suggested.data && !suggested.loading &&
        <>
          <PostShow> {
          data.seeFeed.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              location={post.location}
              caption={post.caption}
              user={post.user}
              files={post.files}
              likeCount={post.likeCount}
              isLiked={post.isLiked}
              comments={post.comments}
              createdAt={post.createdAt}
            />
          ))}
          </PostShow>
          <FeedSide>
            <UserFeed>
              <Avatar size="md" url={me.data.me.avatar} />
              <UserFeedText>
                <div>{me.data.me.username}</div>
                <span>{me.data.me.name}</span>
              </UserFeedText>
            </UserFeed>
            <Suggestions>
              <span>
                <span>Suggestions For You</span>
                <p>See All</p>
              </span>
            </Suggestions>
          </FeedSide>
        </>
      }
    </Wrapper>
  );
};
