import { gql } from "apollo-boost";

export const ME = gql`
  {
    me {
      username
      avatar
      name
    }
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

export const SUGGESTED = gql`
  {
    suggested {
      id
      avatar
      username
      name
      isFollowing
    }
  }
`;