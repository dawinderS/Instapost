import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "rl-react-helmet";
import Loader from "../../Components/Loader";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../../Components/SquarePost";
import Button from "../../Components/Button";

const Wrapper = styled.div`
  min-height: 80vh;
  @media screen and (max-width: 770px) {
    overflow-y: auto;
    width: 100%;
    background: #fff;
    min-height: 94vh;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0;
  margin-bottom: 44px;
  @media screen and (max-width: 770px) {
    display: none;
  }
`;

const HeaderColumn = styled.div`
  width: 34%;
  display: flex;
  justify-content: center;
  margin-right: 0;
  img {
    border-radius: 50%;
    background-size: cover;
  }
`;

const HeaderCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
  button {
    height: 26px;
    text-align: center;
  }
`;

const Username = styled.span`
  font-size: 28px;
  line-height: 32px;
  font-weight: 300;
  margin-right: 20px;
`;

const EditUser = styled.div`
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  color: #262626;
  font-weight: 600;
  padding: 6px 10px;
  cursor: pointer;
  text-align: center; 
  margin-right: 13px;
`;

const Counts = styled.ul`
  display: flex;
  margin: 20px 0px;
`;

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 40px;
  }
`;

const FullName = styled(FatText)`
  font-size: 16px;
`;

const Bio = styled.p`
  margin: 8px 0px 0px 0px;
  font-size: 15px;
  max-width: 350px;
  line-height: 18px;
`;

const MinHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 770px) {
    display: none;
  }
`;

const MinHeaderCol = styled.div`
  display: flex;
  width: 100%;
  padding: 24px 16px 24px 16px;
`;

const MinImage = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 77px;
    width: 77px;
    border-radius: 50%;
    background-size: cover;
    margin-right: 28px;
  }
`;

const MinUsernameRow = styled.div`
  display: flex;
  flex-direction: column;
`;

const MinUsername = styled.span`
  font-size: 28px;
  line-height: 32px;
  font-weight: 300;
  margin-bottom: 12px;
`;

const MinButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-weight: 600;
  height: 26px;
  button {
    height: 26px;
    text-align: center;
  }
`;

const MinStat = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 16px 20px 16px;
  font-size: 14px;
  line-height: 18px;
`;
const MinName = styled.span`
  font-weight: 600;
  margin-bottom: 4px;
`;
const MinBio = styled.span`
`;

const MinCounts = styled.div`
  display: flex;
  width: 100%;
  padding: 12px 0;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #dbdbdb;
  p {
    color: #8e8e8e;
  }
`;

const MinCount = styled.div`
  width: 33.3333%;
  flex-direction: column;
  text-align: center;
  align-items: center;
  line-height: 18px;
`;

const SectionHolder = styled.div`
  height: 53px;
  border-top: 1px solid #dbdbdb;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 770px) {
    height: 45px;
    display: flex;
    color: #8e8e8e;
    justify-content: space-around;
  }
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

const MinTopHeader = styled.header`
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

export default ({ loading, data, logOut }) => {
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeUser) {
    const {
      seeUser: {
        id,
        avatar,
        username,
        name,
        isFollowing,
        isSelf,
        bio,
        followingCount,
        followersCount,
        postsCount,
        posts,
      },
    } = data;
    let namee;
    name ? namee = name : namee = '';
    return (
      <Wrapper>
        <Helmet>
          <title>
            {namee} ({"@" + username}) • Instapost
          </title>
        </Helmet>
        <MinTopHeader>
          <span></span>
          <div>{username}</div>
          <span>{/* <p onClick={onDrop}>Select</p> */}</span>
        </MinTopHeader>
        <Header>
          <HeaderColumn>
            <img src={avatar} width="150" height="150" />
          </HeaderColumn>
          <HeaderCol>
            <UsernameRow>
              <Username>{username}</Username>
              {isSelf ? (
                <Link to="/editprofile">
                  <EditUser>Edit Profile</EditUser>
                </Link>
              ) : null}
              {isSelf ? (
                <Button onClick={logOut} text="Log Out" />
              ) : (
                <FollowButton isFollowing={isFollowing} id={id} />
              )}
            </UsernameRow>
            <Counts>
              <Count>
                <FatText text={String(postsCount)} /> posts
              </Count>
              <Count>
                <FatText text={String(followersCount)} /> followers
              </Count>
              <Count>
                <FatText text={String(followingCount)} /> following
              </Count>
            </Counts>
            <FullName text={name} />
            <Bio>{bio}</Bio>
          </HeaderCol>
        </Header>
        <MinHeader>
          <MinHeaderCol>
            <MinImage>
              <img src={avatar} width="77" height="77" />
            </MinImage>
            <MinUsernameRow>
              <MinUsername>{username}</MinUsername>
              <MinButtons>
                {isSelf ? (
                  <Link to="/editprofile">
                    <EditUser>Edit Profile</EditUser>
                  </Link>
                ) : null}
                {isSelf ? (
                  <Button onClick={logOut} text="Log Out" />
                ) : (
                  <FollowButton isFollowing={isFollowing} id={id} />
                )}
              </MinButtons>
            </MinUsernameRow>
          </MinHeaderCol>
          <MinStat>
            <MinName>{name}</MinName>
            <MinBio>{bio}</MinBio>
          </MinStat>
          <MinCounts>
            <MinCount>
              <FatText text={String(postsCount)} />
              <p>posts</p>
            </MinCount>
            <MinCount>
              <FatText text={String(followersCount)} />
              <p>followers</p>
            </MinCount>
            <MinCount>
              <FatText text={String(followingCount)} />
              <p>following</p>
            </MinCount>
          </MinCounts>
        </MinHeader>
        {/* <SectionHolder /> */}
        <Posts>
          {posts &&
            posts
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((post) => (
                <SquarePost
                  key={post.id}
                  likeCount={post.likeCount}
                  commentCount={post.commentCount}
                  file={post.files[0]}
                />
              ))}
        </Posts>
      </Wrapper>
    );
  }
  return null;
};
