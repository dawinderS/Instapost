import React from "react";
import { Helmet } from "rl-react-helmet";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import SquarePost from "../../Components/SquarePost";
import useInput from "../../Hooks/useInput";
import Input from "../../Components/Input";
import FollowButton from "../../Components/FollowButton/index";


const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-height: 89vh;
  flex-direction: column;
  h1 {
    color: #8e8e8e;
    padding: 25px 20px 10px 20px;
    font-size: 18px;
  }
`;

const Message = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
  font-weight: 500;
  font-size: 25px;
  color: #8e8e8e;
  margin-top: 20px;
  margin-bottom: 10px;
  @media screen and (max-width: 770px) {
    width: 100%;
    // color: #262626;
    font-weight: 400;
    font-size: 18px;
    padding: 0px 15px;
    justify-content: flex-start;
    margin: 30px 0px 0px 0px;
    line-height: 20px;
  }
`;

const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  justify-content: space-between;
  grid-gap: 2%;
  grid-template-columns: repeat(5, 18%);
  grid-template-rows: 185px;
  grid-auto-rows: 185px;
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
    display: grid;
    width: 100%;
    // grid-template-columns: repeat(3, 33.333333%);
    grid-gap: 0%;
    grid-template-columns: repeat(3, 33.1%);
    grid-template-rows: 130px;
    grid-auto-rows: 127px;
    justify-content: space-between;
    // row-gap: 0px;
    row-gap: 1px;
    margin: 0;
    margin-bottom: 45px;
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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 7px 15px 5px 15px;
  z-index: 2;
  height: 5.5vh;
  max-height: 44px;
  min-height: 44px;
  form {
    width: 84%;
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
  width: 16%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #262626;
  cursor: pointer;
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

const MinUserSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 770px) {
    display: none;
  }
`;

const EachMinCard = styled.div`
  display: flex;
  width: 100%;
  padding: 8px 16px;
  align-items: center;
`;

const MinCardLink = styled(Link)`
  display: flex;
  width: 80%;
  align-items: center;
  img {
    border-radius: 50%;
    background-size: cover;
    margin-right: 12px;
  }
`;
const MinInfo = styled.div`
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  span {
    color: #262626;
  }
  p {
    color: #8e8e8e;
    font-weight: 400;
  }
`;

const SearchPresenter = ({ searchTerm, loading, data, me, history }) => {
  // const [action, setAction] = useState("all");
  const search = useInput("");
  const onSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };

  return (
    <Wrapper>
      <MinHeader>
        <form onKeyUp={onSearchSubmit}>
          <SearchInput
            value={search.value}
            onChange={search.onChange}
            placeholder="Search..."
          />
        </form>
        <MinLink to="/explore">
          Cancel
        </MinLink>
      </MinHeader>
      {searchTerm === undefined || searchTerm.length < 1 &&
      <>
        <Message>
          Search for a user by name or username...
        </Message>
        <Message>
          Or search for a post by location or caption...
        </Message>
      </>
      }
      {loading || me.loading &&
        <div></div>
      }
      {searchTerm.length > 0 && searchTerm && 
      data && data.searchUser && data.searchPost && me.data &&
      <>
        <Section>
          {data.searchUser.length === 0 ? (
            <h1>No users found</h1>
          ) : (
              data.searchUser.map((user) => (
                <UserCard
                  key={user.id}
                  username={user.username}
                  name={user.name}
                  isFollowing={user.isFollowing}
                  url={user.avatar}
                  isSelf={user.isSelf}
                  id={user.id}
                  myId={me.data.me.id}
                />
              ))
            )}
        </Section>
        <MinUserSection>
          {data.searchUser.length === 0 ? (
            <h1>No users found</h1>
          ) : (
            data.searchUser.map((user) => (
              <EachMinCard>
                <MinCardLink to={`/${user.username}`}>
                  <img src={user.avatar} width="44" height="44" />
                  <MinInfo>
                    <FatText text={user.username} />
                    <p>{user.name}</p>
                  </MinInfo>
                </MinCardLink>
                {!user.isSelf && <FollowButton myId={me.data.me.id} id={user.id} isFollowing={user.isFollowing} /> }
              </EachMinCard>
            ))
          )}
        </MinUserSection>
        {data.searchPost.length === 0 && <h1>No posts found</h1>}
        <PostSection>
          {data.searchPost.length === 0 ? (
            <div></div>
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
      </>
      }
    </Wrapper>
  );
};

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool,
};

export default SearchPresenter;