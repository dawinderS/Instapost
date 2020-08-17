import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Home, HomeLoc, Explore, ExploreLoc, Upload, HeartEmpty, HeartLoc } from "./Icons";
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

const HeaderLink = styled(Link)`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default withRouter(() => {
  const { data } = useQuery(ME);

  return (
    <Bottom>
      <HeaderLink to="/" replace>
        <Home size={24} />
      </HeaderLink>
      <HeaderLink to="/explore">
        <Explore size={24} />
      </HeaderLink>
      <HeaderLink to="/upload">
        <Upload size={24} />
      </HeaderLink>
      <HeaderLink to="/notifications">
        <HeartEmpty size={24} />
      </HeaderLink>
      {data === undefined || !data.me ? (
        <HeaderLink to="/#">
          <img src="profilePic.jpg" width="24" height="24" />
        </HeaderLink>
      ) : (
        <HeaderLink to={data.me.username}>
          <img src={data.me.avatar} width="24" height="24" />
        </HeaderLink>
      )}
    </Bottom>
  );
});