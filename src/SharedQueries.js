import { gql } from "apollo-boost";

export const ME = gql`
  {
    me {
      username
      avatar
      name
      followers {
        id
        name
        username
        avatar
        createdAt
        isFollowing
      }
      posts {
        files {
          url
        }
        likes {
          id
          createdAt
          user {
            name
            username
            avatar
          }
          post {
            files {
              url
            }
          }
        }
        comments {
          id
          createdAt
          text
          user {
            name
            username
            avatar
          }
          post {
            files {
              url
            }
          }
        }
      }
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