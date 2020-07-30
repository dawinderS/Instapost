import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import { Home, Compass, HeartEmpty, User, Logo } from "./Icons";
import { useQuery, useMutation } from "react-apollo-hooks";
import { ME, LOG_OUT } from "../SharedQueries";

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
  padding: 11px 0px;
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  display: flex;
  justify-content: center;
  align-items: center;
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
  padding-top: 2px;
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
  img {
    border-radius: 50%;
    border: 1px solid grey;
  }
`;

export default withRouter(({ history }) => {
  const search = useInput("");
  const { data } = useQuery(ME);
  const onSearchSubmit = e => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };

  const [logOut] = useMutation(LOG_OUT);

  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/" replace>
            <Logo />
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <form onSubmit={onSearchSubmit}>
            <SearchInput
              value={search.value}
              onChange={search.onChange}
              placeholder="Search"
            />
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
            <HeartEmpty size={22} />
          </HeaderLink>
          {data === undefined || !data.me ? (
            <HeaderLink to="/#">
              <img src="profilePic.jpg" width="23" height="23" />
            </HeaderLink>
          ) : (
            <HeaderLink to={data.me.username}>
              <img src={data.me.avatar} width="23" height="23"/>
            </HeaderLink>
          )}
        </HeaderColumn>
        {/* <div onClick={logOut}>log out</div> */}
      </HeaderWrapper>
    </Header>
  );
});
