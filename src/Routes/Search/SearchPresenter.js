import React from "react";
import { Helmet } from "rl-react-helmet";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import SquarePost from "../../Components/SquarePost";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 75vh;
  flex-direction: column;
`;

const Message = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  font-weight: 500;
  font-size: 25px;
  color: #8e8e8e;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  justify-content: space-between;
  grid-gap: 2%;
  grid-template-columns: repeat(6, 15%);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
  row-gap: 15px;
  @media screen and (max-width: 770px) {
    display: none;
  }
`;

const PostSection = styled(Section)`
  justify-content: space-between;
  grid-template-columns: repeat(4, 23%);
  grid-gap: 2%;
  grid-template-rows: 215px;
  grid-auto-rows: 215px;
  row-gap: 20px;
  @media screen and (max-width: 770px) {
    display: none;
  }
`;

const SearchPresenter = ({ searchTerm, loading, data }) => {
  // const [action, setAction] = useState("all");

  if (searchTerm === undefined || searchTerm.length < 1) {
    return (
      <Wrapper>
        <Message>
          Search for a user by their name or username...
        </Message>
        <Message>
          Or search for a post by its location or caption...
        </Message>
      </Wrapper>
    );
  } else if (loading === true) {
    return (
      <Wrapper>
        <Helmet>
          <title>Instapost</title>
        </Helmet>
        {/* <Loader /> */}
      </Wrapper>
    );
  } else if (data && data.searchUser && data.searchPost) {
    return (
      <Wrapper>
        <Helmet>
          <title>Instapost</title>
        </Helmet>
        <Section>
          {data.searchUser.length === 0 ? (
            <FatText text="No Users Found" />
          ) : (
            data.searchUser.map((user) => (
              <UserCard
                key={user.id}
                username={user.username}
                isFollowing={user.isFollowing}
                url={user.avatar}
                isSelf={user.isSelf}
                id={user.id}
              />
            ))
          )}
        </Section>
        <PostSection>
          {data.searchPost.length === 0 ? (
            <FatText text="No Posts Found" />
          ) : (
            data.searchPost.map((post) => (
              <SquarePost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
              />
            ))
          )}
        </PostSection>
      </Wrapper>
    );
  }
};

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool,
};

export default SearchPresenter;