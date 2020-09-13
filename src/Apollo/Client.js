import ApolloClient from 'apollo-boost';
import { defaults, resolvers } from './LocalState';

export default new ApolloClient({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000"
      : "https://instapost-backend.herokuapp.com/",
  clientState: {
    defaults,
    resolvers,
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// import { ApolloClient } from "apollo-boost";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { HttpLink } from "apollo-link-http";
// import { onError } from "apollo-link-error";
// import { ApolloLink, split } from "apollo-link";
// import { WebSocketLink } from "apollo-link-ws";
// import { getMainDefinition } from "apollo-utilities";
// import { defaults, resolvers } from './LocalState';

// const httpLink = new HttpLink({
//   uri: "http://localhost:4000",
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// });

// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:4000`,
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
//   options: {
//     reconnect: true,
//   },
// });

// export default new ApolloClient({
//   link: ApolloLink.from([
//     onError(({ graphQLErrors, networkError }) => {
//       if (graphQLErrors)
//         graphQLErrors.map(({ message, locations, path }) =>
//           console.log(
//             `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//           )
//         );
//       if (networkError) console.log(`[Network error]: ${networkError}`);
//     }),
//     split(
//       ({ query }) => {
//         const definition = getMainDefinition(query);
//         return (
//           definition.kind === "OperationDefinition" &&
//           definition.operation === "subscription"
//         );
//       },
//       wsLink,
//       httpLink,
//     ),
//   ]),
//   clientState: {
//     defaults,
//     resolvers,
//   },

//   cache: new InMemoryCache(),
// });