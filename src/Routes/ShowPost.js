import React from "react";
import { gql } from "apollo-boost";
import { Link, withRouter, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useQuery, useMutation } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import Post from "../Components/PostShow";
import { GET_POST, ME } from "../SharedQueries";

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

export default withRouter(
  ({
    match: {
      params: { postId }
    },
  }) => {
    const { data, loading } = useQuery(GET_POST, { variables: { id: postId } });
    const me = useQuery(ME);

    // const history = useHistory();
    // console.log(history.location);
    return (
      <Wrapper>
        {loading && <Loader />}
        {!loading && data && data.seeFullPost &&
          me.data && !me.loading && me.data.me &&
          <>
            <Post
              key={data.seeFullPost.id}
              id={data.seeFullPost.id}
              location={data.seeFullPost.location}
              caption={data.seeFullPost.caption}
              user={data.seeFullPost.user}
              me={me.data.me}
              files={data.seeFullPost.files}
              likeCount={data.seeFullPost.likeCount}
              commentCount={data.seeFullPost.commentCount}
              isLiked={data.seeFullPost.isLiked}
              likes={data.seeFullPost.likes}
              comments={data.seeFullPost.comments}
              createdAt={data.seeFullPost.createdAt}
            />
          </>
        }
      </Wrapper>
    );
  }
);