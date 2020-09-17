# Instapost

[Visit Instapost Now](https://instaapost.netlify.app/#/)

Instapost is a single-page, responsive web application that offers a photo sharing and messaging social networking serivce where users can share photos with friends, explore photos from around the world, and privately message with other users in real time. It is created with GraphQL, React.js, and PostgreSQL with its responsive design and funtionality being inspired by the existing social networking platform, Instagram.

More features will be added over time.

## Table of Contents
- [Technologies](#technologies-used)
- [Features](#features)
- [Routes](#routes)
  - [User auth](#user-auth)
  - [Feed](#feed)
  - [Direct Messaging](#direct-messaging)
  - [Upload/Edit Post](#upload-and-edit-post)
  - [Explore](#explore)
  - [Search](#search)
  - [User Profile](#user-profile)
  - [Notifications/Suggested](#notifications-and-suggested)
  - [Full Post Show](#full-post-show)
- [Status/Future Plans](#status-and-future-plans)

## Demo
[Visit Instapost Now](https://instaapost.netlify.app/#/)

## Technologies Used
Instapost is built using:
- GraphQL
- React.js
- Node.js/Express
- AWS S3
- Google Maps API
- PostgreSQL
- Apollo Client & Subscriptions (WebSockets)
- Prisma Server
- Nodemailer
- HTML5 & CSS3
- Heroku

## Features
#### Functionality
- Users can securely sign up, login, and logout
- Users can upload posts containing photo(s), a caption, and a location (optional)
  - using Google Maps API to set location
  - using AWS S3 to store images
- Users can privately message other users in real time via websockets
- Users can search for a user or a post
- Users can like/unlike and comment on posts
- Users can follow/unfollow other users and edit their own profile
- Users can see notifications of users that have recently followed them and of likes/comments their posts receive
- Users can see other users' profiles which contain their bio, followers, following, and posts
- Currently working on:
  - Stories - photos that a user shares for just one day and then the photo disappears
  - Tags - users can tag other users on their posts

#### Design
- Responsive Design
  - Mobile design is fully optimized for all mobile phones and immensely different from desktop design
- styled-components
- Currently working on:
  - a Dark/Light Mode toggle
  
## Routes
### User auth
 - users are able to sign up, login, and logout
 - securely salt and hash users' temporary passcodes using passport-jwt
 - passwordless login --> user enters email and then receives a temporary, generated passcode in their email's inbox
    - Once a passcode is used its usage will expire --> each login results in a different passcode
    ##### Nodemailer and Sendgrid are used to manage emailing passcodes
    ```javascript
    const sendMail = email => {
      const options = {
        auth: {
          api_user: process.env.SENDGRID_USERNAME,
          api_key: process.env.SENDGRID_PASSWORD
        }
      };
      const client = nodemailer.createTransport(sgTransport(options));
      return client.sendMail(email);
    };

    export const sendSecretMail = (address, secret) => {
      const email = { 
        from: "instapostadmin@g.com",
        to: address,
        subject: "Login passcode for Instapost",
        html: `Hello user, your login passcode is <b>${secret}</b>. <br>Copy paste it on the app to log in!`
      }
      return sendMail(email);
    }

    export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
    ```
 
### Feed
- displays your friends' posts as well as your own

### Direct Messaging
- users can send messages to one another in a private chat room
- either user can delete the chat room
- messages are sent in real time using Apollo Subscriptions (WebSockets)
  #### Setting GraphQL Subscription for New Message in Backend
  ```javascript
  export default {
    Subscription: {
      newMessage: {
        subscribe: (_, args) => {
          const { roomId } = args;
          return prisma.$subscribe.message({
            AND: [
              { mutation_in: "CREATED" },
              { node: { room: { id: roomId }}}
            ]
          })
          .node();
        },
        resolve: payload => payload
      }
    }
  };
  ```
  #### Determining whether Apollo Client will use HTTP Link or WebSocket Link on Frontend
  - using Apollo GraphQL, if the page requires a QUERY to fetch data or a MUTATION to change data, a HTTP link will be used
  - if the page requires a SUBSCRIPTION to create steady connection to clients (i.e. realtime messaging between users), a WS (WebSocket) link will be used
  
  ```javascript
  const httpLink = new HttpLink({
    uri: process.env.NODE_ENV === "development" ? "http://localhost:4000" : "https://instapost-backend.herokuapp.com/",
  });
  const wsLink = new WebSocketLink({
    uri: process.env.NODE_ENV === "development" ? "`ws://localhost:4000`" : "ws://instapost-backend.herokuapp.com/",
    options: { reconnect: true },
  });

  export default new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => { ... }),
      split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        httpLink,
      ),
    ]),
    cache: new InMemoryCache(),
  });
  ```

### Explore
- displays popular posts of users you are not following and posts of friends you have not yet liked

### Search
- users can search for user or post
- as user types, the search query updates and returns a new object containing all the possible outcomes
  ##### Using url location to determine search value
  ```javascript
  const onSearchSubmit = e => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };
  
  export default withRouter(({ location: { search }, history }) => {
    const term = search.split("=")[1];
    const { data, loading } = useQuery(SEARCH, {
      skip: term === undefined,
      variables: { term },
    });
    
    return <SearchPresenter history={history} searchTerm={term} loading={loading} data={data} />;
  });
  ```

### Upload and Edit Post
- uploaded post will contain photos, a caption, and an optional location
- size of image is adjusted to best reflect the current design
- users can delete their post or edit their posts' caption/location

### User Profile
- contains user info such as username, name, bio, posts, followers, following, etc
- users can edit their profile
- users can view other users' posts in either multi-view or single view

### Notifications and Suggested
- Notifications
  - displays notifications of recent users following you or liking/commenting on one of your posts
- Suggested
  - displays users suggested for you to follow

### Full Post Show
- to not overcrowd pages, if a post has more than 3 comments you can only see all of them at a full post show

## Status and Future Plans
Some features I am currently working on and would like to add in the future are
  - a Dark/Light Mode toggle
  - Private/Not Private - users can decide if they have a private acc in which case only friends can see your posts and message you
  - Saved posts - users can save posts that they like in their saved folder which can be accessed in their user profile page
