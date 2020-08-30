import React from "react";
import styled from "styled-components";
import { Link, NavLink, withRouter } from "react-router-dom";
import { 
  Home, HomeLoc, MessagingIcon, MessagingIconLoc, Explore, ExploreLoc, Upload, 
  UploadLoc, HeartEmpty, HeartLoc } from "./Icons";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../SharedQueries";

const Bottom = styled.div`
  @media screen and (min-width: 770px) {
    display: none;
  }
  @media screen and (max-width: 770px) {
    height: 5.5vh;
    max-height: 44px;
    min-height: 44px;
    z-index: 10;
    border: 0;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: white;
    border-top: ${(props) => props.theme.boxBorder};
    border-radius: 0px;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;

const HeaderLink = styled(NavLink)`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    border-radius: 50%;
    background-size: cover;
  }
`;
const ImgLoc = styled.img`
  border-radius: 50%;
  border: 1px solid #262626;
  padding: 1px;
`;

export default withRouter(({ history }) => {
  const { data } = useQuery(ME);
  const pathname = history.location.pathname;

  return (
    <Bottom>
      <HeaderLink to="/" replace>
        {pathname === "/" ? <HomeLoc size={24} /> : <Home size={24} />}
      </HeaderLink>
      <HeaderLink to="/explore">
        {pathname === "/explore" ? <ExploreLoc size={24} /> : <Explore size={24} />}
      </HeaderLink>
      <HeaderLink to="/upload">
        {pathname === "/upload" ? <UploadLoc size={24} /> : <Upload size={24} />}
      </HeaderLink>
      <HeaderLink to="/notifications">
        {pathname === "/notifications" ? <HeartLoc size={24} /> : <HeartEmpty size={24} />}
      </HeaderLink>
      {data === undefined || !data.me ? (
        <HeaderLink to="/#">
          <img src="profilePic.jpg" width="24" height="24" />
        </HeaderLink>
      ) : (
        <HeaderLink to={`/${data.me.username}`}>
          {pathname !== `/${data.me.username}` && <img src={data.me.avatar} width="24" height="24" />}
          {pathname === `/${data.me.username}` && <ImgLoc src={data.me.avatar} width="24" height="24" />}
        </HeaderLink>
      )}
    </Bottom>
  );
});