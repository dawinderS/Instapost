import { gql } from "apollo-boost";

export const ME = gql`
  {
    me {
      username
      avatar
    }
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;