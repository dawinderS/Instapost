import { gql } from "apollo-boost";

export const SEE_ROOMS = gql`
  {
    seeRooms {
      id
      participants
      messages
      createdAt
      updatedAt
    }
  }
`;

export const SEE_ROOM = gql`
  query seeRoom($id: String!) {
    seeRoom(id: $id) {
      id
      participants
      messages
      createdAt
      updatedAt
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($message: String!, roomId: String, toId: String) {
    sendMessage(message: $message, roomId: $roomId, toId: $toId) {
      id
      roomId
      toId
      message
    }
  }
`;

export const NEW_MESSAGE = gql`
  subscription newMessage($roomId: String!) {
    newMessage(roomId: $roomId) {
      id
      roomId
    }
  }
`;