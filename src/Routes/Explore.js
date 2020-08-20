import React from "react";
import { Helmet } from "rl-react-helmet";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import SquarePost from "../Components/SquarePost";
import Post from "../Components/Post/index";
import useInput from "../Hooks/useInput";
import Input from "../Components/Input";

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
  min-height: 89vh;
  max-height: 89vh;
  width: 100%;
  overflow-y: auto;
`;

const Explore = styled.div`

`;

const Posts = styled.div`
  display: grid;
  width: 100%;
  margin-bottom: 45px;
  grid-template-columns: repeat(3, 32%);
  // grid-template-rows: minmax(100px, 293px);
  grid-template-rows: 293px;
  grid-auto-rows: 293px;
  justify-content: space-between;
  row-gap: 25px;
  @media screen and (max-width: 770px) {
    display: grid;
    width: 100%;
    // grid-template-columns: repeat(3, 33.333333%);
    grid-template-columns: repeat(3, 33.1%);
    grid-template-rows: 130px;
    grid-auto-rows: 127px;
    justify-content: space-between;
    // row-gap: 0px;
    row-gap: 1px;
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
  justify-content: center;
  align-items: center;
  padding: 7px 15px 5px 15px;
  z-index: 2;
  height: 5.5vh;
  max-height: 44px;
  min-height: 44px;
  form {
    width: 100%;
    height: 100%;
  }
  img {
    max-width: 24%;
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

const SearchInput = styled(Input)`
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px 3px;
  font-size: 14px;
  border-radius: 6px;
  height: 30px;
  text-align: center;
  width: 100%;
  // border: none;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;

export default withRouter(({ history }) => {
  const { data, loading } = useQuery(EXPLORE_QUERY);
  const search = useInput("");
  const onSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };


  return (
    <Wrapper id="outside">
      <Helmet>
        <title>Instapost</title>
      </Helmet>
      {loading && <Loader />}
      <MinHeader>
        <MinLink to="/search?term=" >
          <form onSubmit={onSearchSubmit}>
            <SearchInput
              value={search.value}
              onChange={search.onChange}
              placeholder="Search..."
            />
          </form>
        </MinLink>
      </MinHeader>
      {!loading && data && data.seeExplore && (
        <Posts>
          {data.seeExplore.map((post) => (
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
});
