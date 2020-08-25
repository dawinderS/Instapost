import React from "react";
import { withRouter } from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "./SearchQueries";
import { ME } from "../../SharedQueries";

export default withRouter(({ location: { search }, history }) => {
  const term = search.split("=")[1];
  const { data, loading } = useQuery(SEARCH, {
    skip: term === undefined,
    variables: {
      term,
    },
  });
  const me = useQuery(ME);

  return <SearchPresenter history={history} me={me} searchTerm={term} loading={loading} data={data} />;
});