import React from "react";
import { Helmet } from "rl-react-helmet";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import SquarePost from "../Components/SquarePost";
import Post from "../Components/Post/index";

const EXPLORE_QUERY = gql`
  {
    seeExplore {
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
      commentCount
      isLiked
      likes {
        id
        user {
          username
          name
          avatar
          isFollowing
        }
      }
      comments {
        id
        text
        user {
          id
          username
        }
        createdAt
      }
      createdAt
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 55vh;
  width: 100%;
`;

const Explore = styled.div`

`;

const Posts = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 32%);
  // grid-template-rows: minmax(100px, 293px);
  grid-template-rows: 293px;
  grid-auto-rows: 293px;
  justify-content: space-between;
  row-gap: 25px;
`;


export default () => {
  const { data, loading } = useQuery(EXPLORE_QUERY);

  return (
    <Wrapper id="outside">
      <Helmet>
        <title>Instapost</title>
      </Helmet>
      {loading && <Loader />}
      {!loading && data && data.seeExplore && (
        <Posts>
          {
          data.seeExplore.map((post) => (
            <SquarePost
              key={post.id}
              likeCount={post.likeCount}
              commentCount={post.commentCount}
              file={post.files[0]}
            />
          ))}
        </Posts>
      )}
    </Wrapper>
  );
};
