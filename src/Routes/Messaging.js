import React from "react";
import { Helmet } from "rl-react-helmet";
import { gql } from "apollo-boost";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Avatar from "../Components/Avatar";
import { HeaderBackButton, MessagingLogo } from "../Components/Icons";


export const SEE_ROOMS = gql`
  {
    seeRooms {
      id
      participants {
        id
        username
        avatar
        name
      }
      messages {
        id
        text
        from {
          id
          username
        }
        to {
          id
          username
        }
      }
      createdAt
      updatedAt
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100%;
  @media screen and (max-width: 770px) {
    width: 100%;
    height: 89vh;
    justify-content: flex-start;
  }
`;

const InboxBox = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  height: 85vh;
  background-color: #fff;
  display: flex;
  @media screen and (max-width: 770px) {
    border: none;
    border-radius: 0;
  }
`;

const AllRooms = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 350px;
  border-right: 1px solid #e6e6e6;
  @media screen and (max-width: 770px) {
    width: 100%;
  }
`;

const RoomHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 0px 20px;
  border-bottom: 1px solid #e6e6e6;
  svg {
    margin: 0;
    transform: rotate(270deg);
  }
  div {
    font-size: 17px;
    font-weight: 600;
    text-align: center;
  }
  span {
    width: 20%;
    display: flex;
  }
  p {
    width: 100%;
    display: flex;
  }
  #last-svg {
    justify-content: flex-end;
  }
  @media screen and (max-width: 770px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 50px;
  }
`;

const RoomsList = styled.div`
  width: 100%;
  padding-top: 8px;
  display: flex;
  flex-direction: column;
`;

const SideMessage = styled.div`
  display: flex;
`;

const Empty = styled.div`
  width: 65%;
  text-align: center;
  font-size: 24px;
  padding: 80px 0px 40px 0px;
  div {
    margin: 15px 0px 25px 0px;
  }
  @media screen and (max-width: 770px) {
    width: 100%;
    font-size: 20px;
  }
`;

export default withRouter(({ history }) => {
  const { data, loading } = useQuery(SEE_ROOMS);
  const returnBack = (e) => {
    history.goBack();
  };

  return (
    <Wrapper>
      <Helmet>
        <title>Inbox • Direct</title>
      </Helmet>
      <InboxBox>
        <AllRooms>
          <RoomHeader>
            <span>
              <p onClick={returnBack}>
                <HeaderBackButton />
              </p>
            </span>
            <div>Direct</div>
            <span>
              <p id="last-svg">
                <MessagingLogo />
              </p>
            </span>
          </RoomHeader>
          <RoomsList>
            {loading && <Loader />}
            {console.log(data)}
            {!loading && data && data.seeRooms && (
              <>
                {data.seeRooms.length < 1 && (
                  <Empty>
                    <div>Your inbox is empty</div>
                  </Empty>
                )}
                {data.seeRooms.length > 0 && <div>hello</div>}
              </>
            )}
          </RoomsList>
        </AllRooms>
        <SideMessage></SideMessage>
      </InboxBox>
    </Wrapper>
  );
});