import { gql } from "apollo-boost";

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
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const SEE_ROOM = gql`
  query seeRoom($id: String!) {
    seeRoom(id: $id) {
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
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_ROOM = gql`
  mutation deleteRoom($id: String!) {
    deleteRoom(id: $id) {
      id
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($message: String!, $roomId: String, $toId: String) {
    sendMessage(message: $message, roomId: $roomId, toId: $toId) {
      id
      text
      room {
        id
        participants {
          id
        }
      }
      to {
        id
      }
      from {
        id
      }
    }
  }
`;

export const NEW_MESSAGE = gql`
  subscription newMessage($roomId: String!) {
    newMessage(roomId: $roomId) {
      id
      room
    }
  }
`;

export const SEARCH = gql`
  query search($term: String!) {
    searchUser(term: $term) {
      id
      avatar
      username
      name
      isFollowing
      isSelf
    }
  }
`;