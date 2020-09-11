import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  display: flex;
  width: 295px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 11px;
  margin: 50px 0px;
  margin-top: auto;
  @media screen and (max-width: 770px) {
    display: none;
  }
`;
const FooterHolder = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const List = styled.ul`
  display: flex;
  margin-bottom: 10px;
`;

const ListItem = styled.li`
  display: flex;
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const Link = styled.a`
  color: ${(props) => props.theme.darkBlueColor};
  display: flex;
`;

const Copyright = styled.span`
  color: ${(props) => props.theme.darkGreyColor};
`;

export default () => (
  <FooterHolder>
    <Footer>
      <List>
        <ListItem>
          <Link
            rel="nofollow noopener noreferrer"
            href="https://www.dawindersingh.com/#cta"
            target="_blank"
          >
            contact me
          </Link>
        </ListItem>
        <ListItem>
          <Link
            rel="nofollow noopener noreferrer"
            href="https://www.dawindersingh.com/"
            target="_blank"
          >
            about dev
          </Link>
        </ListItem>
        <ListItem>
          <Link
            rel="nofollow noopener noreferrer"
            href="https://www.linkedin.com/in/dawinder-singh/"
            target="_blank"
          >
            linkedin
          </Link>
        </ListItem>
      </List>
      <List>
        <ListItem>
          <Link
            rel="nofollow noopener noreferrer"
            href="https://github.com/dawinderS/instapost-frontend"
            target="_blank"
          >
            project frontend
          </Link>
        </ListItem>
        <ListItem>
          <Link
            rel="nofollow noopener noreferrer"
            href="https://github.com/dawinderS/instapost-backend"
            target="_blank"
          >
            project backend
          </Link>
        </ListItem>
      </List>
      <Copyright>
        &copy; {new Date().getFullYear()} Instapost By Dawinder Singh
      </Copyright>
    </Footer>
  </FooterHolder>
);
