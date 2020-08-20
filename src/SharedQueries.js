import { gql } from "apollo-boost";

export const ME = gql`
  {
    me {
      id
      username
      avatar
      name
      email
      bio
      phone
      gender
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

export const FEED_QUERY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      commentCount
      isLiked
      likes {
        id
        user {
          username
          name
          avatar
          isFollowing
        }
      }
      comments {
        id
        text
        user {
          id
          username
        }
        createdAt
      }
      createdAt
    }
  }
`;

export const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      id
      avatar
      username
      name
      isFollowing
      isSelf
      bio
      phone
      gender
      email
      followingCount
      followersCount
      postsCount
      posts {
        id
        files {
          url
        }
        likeCount
        commentCount
        createdAt
      }
    }
  }
`;
export const GET_USER_BY_ID = gql`
  query seeUserById($id: String!) {
    seeUserById(id: $id) {
      id
      avatar
      username
      name
      isFollowing
      isSelf
      bio
      phone
      gender
      email
      followingCount
      followersCount
      postsCount
      posts {
        id
        files {
          url
        }
        likeCount
        commentCount
        createdAt
      }
    }
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

export const LOG_OUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;