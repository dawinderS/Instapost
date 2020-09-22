import React from "react";
import { Helmet } from "rl-react-helmet";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import SquarePost from "../Components/SquarePost";
import useInput from "../Hooks/useInput";
import Input from "../Components/Input";
import { Logo } from "../Components/Icons";

const EXPLORE_QUERY = gql`
  {
    seeExplore {
      id
      location
      caption
      user {
        id
      }
      files {
        id
        url
      }
      likeCount
      commentCount
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 75vh;
  /* max-height: 89vh; */
  width: 100%;
  overflow-y: auto;
  @media screen and (max-width: 770px) {
    margin-bottom: 44px;
  }
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
    margin: 0;
    overflow-y: scroll;
  }
`;

const PostLink = styled(Link)`
  width: 100%;
  height: 100%;
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
  input {
    background-color: ${(props) => props.theme.bgColor};
    padding: 5px 3px;
    font-size: 14px;
    border-radius: 6px;
    height: 30px;
    text-align: center;
    width: 100%;
    // border: none;
    &::placeholder {
      font-weight: 200;
    }
    outline: none;
    border: 1px solid #dbdbdb;
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
    font-weight: 200;
  }
`;

const Empty = styled.div`
  width: 100%;
  text-align: center;
  font-size: 24px;
  padding: 80px 0px 40px 0px;
  div {
    margin: 15px 0px 25px 0px;
  }
  @media screen and (max-width: 770px) {
    font-size: 20px;
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
        <title>Explore • Instapost</title>
      </Helmet>
      {loading && <Loader />}
      <MinHeader>
        <MinLink to="/search?term=">
          <form onKeyUp={onSearchSubmit}>
            <input
              value={search.value}
              onChange={search.onChange}
              placeholder="Search..."
            ></input>
          </form>
        </MinLink>
      </MinHeader>
      {!loading && data && data.seeExplore && data.seeExplore.length === 0 && (
        <>
          <Empty>
            <Logo size={60} />
            <div>Nothing left to explore</div>
            <Link to="/">Return to your feed?</Link>
          </Empty>
        </>
      )}
      {!loading && data && data.seeExplore && data.seeExplore.length > 0 && (
        <>
          <Posts>
            {data.seeExplore.map((post) => (
              <PostLink key={post.id} to={`p/${post.id}`}>
                <SquarePost
                  key={post.id}
                  likeCount={post.likeCount}
                  commentCount={post.commentCount}
                  file={post.files[0]}
                />
              </PostLink>
            ))}
          </Posts>
        </>
      )}
    </Wrapper>
  );
});
