import { gql } from "apollo-boost";

export const TOGGLE_LIKE = gql`
  mutation toggelLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text: String!) {
    addComment(postId: $postId, text: $text) {
      id
      text
      user {
        username
      }
    }
  }
`;

export const EDIT_POST = gql`
  mutation editPost($id: String!, $caption: String, $location: String, $action: ACTIONS!) {
    editPost(id: $id, caption: $caption, location: $location, action: $action) {
      id
      caption
      location
      action
    }
  }
`;
