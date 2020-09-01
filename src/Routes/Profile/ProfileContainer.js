import React from "react";
import { gql } from "apollo-boost";
import { withRouter } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo-hooks";
import ProfilePresenter from "./ProfilePresenter";
import { GET_USER, ME, LOG_OUT } from "../../SharedQueries";

export default withRouter(
  ({
    match: {
      params: { username },
    },
  }) => {
    const { data, loading } = useQuery(GET_USER, { variables: { username } });
    const me = useQuery(ME);
    const [logOut] = useMutation(LOG_OUT);
    return <ProfilePresenter me={me} loading={loading} logOut={logOut} data={data} />;
  }
);