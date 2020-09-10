import React, { useState } from "react";
import { Helmet } from "rl-react-helmet";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import { useQuery, useMutation } from "react-apollo-hooks";
import { ME, SUGGESTED } from "../../SharedQueries";
import { SEE_ROOMS, SEARCH, SEND_MESSAGE } from "./MessagingQueries";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import { HeaderBackButton, MessagingLogo, MessagingIcon, CancelButton } from "../../Components/Icons";
import TextareaAutosize from "react-autosize-textarea";
import Modal from "react-modal";
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    padding: "0",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: "20",
  },
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100%;
  @media screen and (max-width: 770px) {
    width: 100%;
    min-height: 75vh;
    justify-content: flex-start;
  }
`;

const InboxBox = styled.div`
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  background-color: white;
  width: 100%;
  height: 85vh;
  background-color: #fff;
  display: flex;
  @media screen and (max-width: 770px) {
    border: none;
    border-radius: 0;
    height: 100%;
  }
`;

const AllRooms = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 350px;
  border-right: 1px solid #dbdbdb;
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
  border-bottom: 1px solid #dbdbdb;
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
    display: flex;
    cursor: pointer;
  }
  #last-svg {
    justify-content: flex-end;
  }
  @media screen and (min-width: 770px) {
    #returnback {
      display: none;
    }
  }
  @media screen and (max-width: 770px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 44px;
    z-index: 10;
  }
`;

const RoomsList = styled.div`
  width: 100%;
  padding-top: 8px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 88px);
  overflow-y: scroll;
`;

const EachCard = styled.div`
  width: 100%;
  display: flex;
  padding: 8px 20px;
  align-items: center;
  min-height: 60px;
  img {
    border-radius: 50%;
    background-size: cover;
  }
  cursor: pointer;
  &:hover {
    background-color: #fafafa;
  }
  div {
    color: #262626;
  }
  span {
    width: 24px;
    height: 24px;
    border: 1px solid #dbdbdb;
    border-radius: 50%;
    margin-left: auto;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fafafa;
    &:hover {
      background-color: ${(props) => props.theme.blueColor};
    }
  }
  #picked {
    background-color: ${(props) => props.theme.blueColor};
  }
`;

const UserInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 12px;
  div {
    font-weight: 600;
  }
  p {
    margin-top: 6px;
    color: #8e8e8e;
  }
`;

const SideMessage = styled.div`
  display: flex;
  height: 100%;
  width: 585px;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 770px) {
    display: none;
  }
`;

const CenterText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    height: 95px;
    width: 95px;
    border-radius: 100px;
    border: 3px solid #262626;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      margin: 10px 0px 0px 0px;
    }
  }
  div {
    font-size: 22px;
    font-weight: 400;
    margin-top: 32px;
  }
  p {
    font-size: 14px;
    font-weight:400;
    color: #8e8e8e;
    margin: 16px 0px 24px 0px;
  }
  h1 {
    height: 30px;
    padding: 5px 9px;
    background-color: #0095f6;
    color: #ffffff;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    text-align: center;
    display: flex;
    align-items: center;
  }
`;

const Empty = styled.div`
  width: 100%;
  text-align: center;
  font-size: 24px;
  padding: 80px 0px 40px 0px;
  color: #8e8e8e;
  @media screen and (max-width: 770px) {
    width: 100%;
  }
`;

const ModalWrapper = styled.div`
  width: 300px;
  @media screen and (min-width: 735px) {
    width: 400px;
  }
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dbdbdb;
  padding: 0px 16px;
  div {
    display: flex;
    width: 20%;
    span {
      cursor: pointer;
    }
  }
  h1 {
    text-align: center;
    font-size: 18px;
    line-height: 24px;
    font-weight: 600;
    color: #262626;
  }
  #sendmessage {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 16px;
    color: ${(props) => props.theme.blueColor};
    font-weight: 600;
    cursor: pointer;
  }
  #sendmessage2 {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 16px;
    color: ${(props) => props.theme.blueColor};
    font-weight: 600;
    cursor: default;
    opacity: 0.4;
  }
`;

const SearchHolder = styled.div`
  width: 100%;
  min-height: 55px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
  div {
    width: 15%;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 12px;
    font-size: 16px;
    font-weight: 600;
  }
  form {
    width: 85%;
  }
  input {
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 12px;
    outline: none;
    border: none;
    font-size: 15px;
  }
`;

const SuggestedText = styled.div`
  display: flex;
  width: 100%;
  padding: 16px 20px;
  font-weight: 600;
`;

const SearchResults = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 310px;
  max-height: 310px;
  overflow-y: scroll;
  margin-bottom: 12px;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  resize: none;
  font-size: 16px;
  &:focus {
    outline: none;
  }
  padding: 10px 12px;
  max-height: 120px;
`;

export default withRouter(({ history }) => {
  const { data, loading } = useQuery(SEE_ROOMS);
  const me = useQuery(ME);
  const suggested = useQuery(SUGGESTED);
  const [newModal, setNewModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [toId, setToId] = useState("");
  const [message, setMessage] = useState("");
  const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
    refetchQueries: () => [
      { query: SEE_ROOMS }
    ]
  });

  const term = searchInput;
  const search = useQuery(SEARCH, {
    skip: searchInput.length < 1,
    variables: { term }, 
  });
  const onSearchSubmit = (e) => {
    e.preventDefault();
    
  };

  const returnBack = (e) => {
    history.push("/");
  };

  const openModal = () => {
    setNewModal(true);
  };
  const closeModal = () => {
    setNewModal(false);
    setToId("");
    setMessage("");
    setSearchInput("");
  };

  const updateSearch = e => {
    setToId("");
    const value = e.target.value;
    setSearchInput(value);
  };

  const updateMessage = e => {
    const value = e.target.value;
    setMessage(value);
  }

  const handleNewSend = async () => {
    if (message === "") {
      toast.error("No message has been written")
      return;
    }
    if (toId === me.data.me.id) {
      toast.error("Please choose someone other than yourself to chat")
      return;
    }
    try {
      const { data: { sendMessage }} = await sendMessageMutation({
        variables: { message, toId }
      });
      if (sendMessage) {
        closeModal();
        history.push(`/direct`)
      }
    } catch (e) {
      console.log(e);
    } finally {

    }
  };
  
  const getDate = (createdAt) => {
    let time = moment(createdAt).fromNow();
    let arr = time.split(" ");
    if (arr[0].includes("a") && arr[1].includes("few")) {
      return `1m`;
    } else if (arr[0].includes("a") && !arr[1].includes("month")) {
      return `1${arr[1][0]}`;
    } else if (arr[0].includes("a") && arr[1].includes("month")) {
      return `4w`;
    } else if (arr[1].includes("min")) {
      return `${arr[0]}m`;
    } else if (arr[1].includes("hour")) {
      return `${arr[0]}h`;
    } else if (arr[1].includes("day")) {
      return `${arr[0]}d`;
    } else if (arr[1].includes("week")) {
      return `${arr[0]}w`;
    } else if (arr[1].includes("month")) {
      return `${arr[0] * 4}w`;
    } else if (arr[1].includes("year")) {
      return `${arr[0]}y`;
    }
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
              <p id="returnback" onClick={returnBack}>
                <HeaderBackButton />
              </p>
            </span>
            <div>Direct</div>
            <span id="last-svg">
              <p onClick={openModal}>
                <MessagingLogo />
              </p>
            </span>
          </RoomHeader>
          <RoomsList>
            {loading && <Loader />}
            {!loading && !me.loading && data && data.seeRooms && (
              <>
                {data.seeRooms.length < 1 && (
                  <Empty>
                    <div>Your inbox is empty</div>
                  </Empty>
                )}
                {data.seeRooms.length > 0 &&
                  data.seeRooms.map((room) => {
                    let user = room.participants.filter(
                      (user) => user.id !== me.data.me.id
                    );
                    let message = room.messages[room.messages.length - 1];
                    return (
                      <Link key={room.id} to={`/direct/t/${room.id}`}>
                        <EachCard key={room.id}>
                          <Avatar size="md" url={user[0].avatar} />
                          <UserInfo>
                            <div>{user[0].username}</div>
                            <p>
                              {message.text.slice(0, 26)}
                              {" • "}
                              {getDate(message.createdAt)}
                            </p>
                          </UserInfo>
                        </EachCard>
                      </Link>
                    );
                  })}
              </>
            )}
          </RoomsList>
        </AllRooms>
        <SideMessage>
          <CenterText>
            <span>
              <MessagingIcon size={50} />
            </span>
            <div>Your Messsages</div>
            <p>Send private messages to a friend.</p>
            <h1 onClick={openModal}>Send Message</h1>
          </CenterText>
        </SideMessage>
      </InboxBox>
      <Modal
        isOpen={newModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ModalWrapper>
          <ModalHeader>
            <div>
              <span onClick={closeModal}>
                <CancelButton size={20} />
              </span>
            </div>
            <h1>New Message</h1>
            {toId.length < 1 ? (
              <div id="sendmessage2">Send</div>
            ) : (
              <div onClick={handleNewSend} id="sendmessage">Send</div>
            )}
          </ModalHeader>
          <SearchHolder>
            <Textarea
              id="caption"
              placeholder={"Write a message..."}
              onChange={updateMessage}
              value={message}
              autoFocus
            />
          </SearchHolder>
          <SearchHolder>
            <div>To:</div>
            <form onKeyUp={onSearchSubmit}>
              <input
                placeholder={"Search..."}
                onChange={updateSearch}
                value={searchInput}
              />
            </form>
          </SearchHolder>
          <SearchResults>
            {searchInput.length < 1 &&
              !me.loading &&
              me.data &&
              !suggested.loading &&
              suggested.data && (
                <>
                  <SuggestedText>Suggested</SuggestedText>
                  {me.data.me.following
                    .concat(suggested.data.suggested)
                    .slice(0, 15)
                    .map((user) => (
                      <EachCard key={user.id} onClick={() => setToId(user.id)}>
                        <img
                          src={user.avatar}
                          width="44"
                          height="44"
                          alt="avatar"
                        />
                        <UserInfo>
                          <div>{user.username}</div>
                          <p>{user.name}</p>
                        </UserInfo>
                        {toId === user.id ? (
                          <span id="picked">✓</span>
                        ) : (
                          <span id="notpicked"></span>
                        )}
                      </EachCard>
                    ))}
                </>
              )}
            {searchInput.length > 0 &&
              !search.loading &&
              search.data &&
              search.data.searchUser &&
              search.data.searchUser.length < 1 && (
                <SuggestedText>No users found</SuggestedText>
              )}
            {searchInput.length > 0 &&
              !search.loading &&
              search.data &&
              search.data.searchUser &&
              search.data.searchUser.length > 0 &&
              search.data.searchUser.map((user) => (
                <EachCard key={user.id} onClick={() => setToId(user.id)}>
                  <img src={user.avatar} width="44" height="44" alt="avatar" />
                  <UserInfo>
                    <div>{user.username}</div>
                    <p>{user.name}</p>
                  </UserInfo>
                  {toId === user.id ? (
                    <span id="picked">✓</span>
                  ) : (
                    <span id="notpicked"></span>
                  )}
                </EachCard>
              ))}
          </SearchResults>
        </ModalWrapper>
      </Modal>
    </Wrapper>
  );
});