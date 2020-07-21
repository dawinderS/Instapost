import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { gql } from "apollo-boost";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import { Home, Compass, HeartEmpty, User, Logo } from "./Icons";
import { useQuery } from "react-apollo-hooks";


const Header = styled.header`
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
  padding: 25px 0px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const SearchInput = styled(Input)`
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;

export default () => {
  const search = useInput("");
  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/" replace>
            <Logo />
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <form>
            <SearchInput {...search} placeholder="Search" />
          </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to="/" replace>
            <Home />
          </HeaderLink>
          <HeaderLink to="/explore">
            <Compass />
          </HeaderLink>
          <HeaderLink to="/notifications">
            <HeartEmpty />
          </HeaderLink>
          <HeaderLink to="/username">
            <User />
          </HeaderLink>
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
};
