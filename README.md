# Instapost

[Visit Instapost Now](https://instaapost.netlify.app/#/)

[See Repo for Instapost Backend](https://github.com/dawinderS/instapost-backend)

 ![feed1](https://user-images.githubusercontent.com/58091313/94135393-41831000-fe18-11ea-9029-556568ff7026.png) &nbsp; &nbsp; ![feedM1](https://user-images.githubusercontent.com/58091313/94135400-434cd380-fe18-11ea-8ff8-7e25ac6501ff.png)

Instapost is a single-page, responsive web application that serves as a photo sharing and messaging social networking platform where users can share photos with friends, explore photos from around the world, and privately message with other users in real time. It is created with GraphQL, React.js, and PostgreSQL, with its responsive design and functionality being inspired by the existing social networking platform, Instagram.

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
### Backend
- PostgreSQL
- AWS S3
- Express.js
- Prisma Server
- Nodemailer
- Heroku
### Frontend
- GraphQL
- React
- Node.js
- Google Maps API
- Apollo Client & Subscriptions (WebSockets)
- HTML5 & CSS3
- Netlify

## Features
#### Functionality
- Users can securely sign up, login, logout, and receive password via email if they forget it
- Users can upload posts containing photo(s), a caption, and a location (optional)
  - using Google Maps API to set location
  - using AWS S3 to store images
- Users can privately message other users in real time
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
 - forgot password? User can enter their email or username and then receive their password in their email's inbox
    ##### Nodemailer and Sendgrid are used to manage emailing passwords
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

    export const sendSecretMail = (address, password) => {
      const email = { 
        from: "instapost@g.com",
        to: address,
        subject: "Your password for Instapost",
        html: `Hello user, your password is <b>${password}</b>. <br>Copy paste it on the app to log in!`
      }
      return sendMail(email);
    }

    export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
    ```
 
### Feed
- displays posts of user & users they are following
  - ordered by latest posts to oldest
- see pictures posted above for design layout of feed

### Direct Messaging
- users can send messages to one another in a private chat room
- either user can delete the chat room
- messages are sent in real time using Apollo Subscriptions (WebSockets)

#### Design allows chat box to display messages from bottom up
![dms1](https://user-images.githubusercontent.com/58091313/94136231-79d71e00-fe19-11ea-950f-5c2305bc7b43.png) &nbsp; &nbsp; ![dmsM1](https://user-images.githubusercontent.com/58091313/94136237-7ba0e180-fe19-11ea-9e13-ffcba74f833e.png)
  
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
  - if the page requires a SUBSCRIPTION to create steady connection to clients (i.e. real time messaging between users), a WS (WebSocket) link will be used
  
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
- displays popular posts of unfollowed users and feed posts user has not yet liked

![explore1](https://user-images.githubusercontent.com/58091313/94139046-de947780-fe1d-11ea-9fc1-bebea3634545.png) &nbsp; &nbsp; ![exploreM1](https://user-images.githubusercontent.com/58091313/94139054-e0f6d180-fe1d-11ea-978f-ba22211e8bdb.png)

### Search
- users can search for user or post
  - search for user by username or name
  - search for post by location or caption
- as user types, the search query updates and returns a new object containing all the results
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
  ##### Search design renders users followed by posts
![search1](https://user-images.githubusercontent.com/58091313/94139970-6929a680-fe1f-11ea-8a1f-918dcb3ada06.png) &nbsp; &nbsp; ![searchM1](https://user-images.githubusercontent.com/58091313/94139976-6b8c0080-fe1f-11ea-9d11-9b14ffd55539.png)

### Upload and Edit Post
- user selects photo and then adds a caption and optional location
  - Google Maps API is used for location search
  - each photo is stored in AWS S3
- size of image is adjusted to best reflect the current design
- users can delete their posts and edit their posts' caption or location

### User Profile
- contains user info such as username, name, bio, posts, followers, following, etc
- profile posts can be seen in either multi-view or single view

![profile1](https://user-images.githubusercontent.com/58091313/94140227-c6255c80-fe1f-11ea-9025-092d8959eeb4.png) &nbsp; &nbsp; ![profileM1](https://user-images.githubusercontent.com/58091313/94140235-c7ef2000-fe1f-11ea-983b-81ef1163ab0a.png)

#### Edit Profile
  - users can edit their profile picture, password, name, username, bio, email, etc.

### Notifications and Suggested
- Notifications
  - displays notifications of user's new followers and of likes/coments made on user's posts
- Suggested
  - displays other users suggested for user to follow

![notifs1](https://user-images.githubusercontent.com/58091313/94140839-ba866580-fe20-11ea-9407-003ae3225a9d.png) &nbsp; &nbsp; &nbsp; &nbsp; ![suggestions1](https://user-images.githubusercontent.com/58091313/94140842-bce8bf80-fe20-11ea-9509-2b83316e408e.png)

### Full Post Show
- to not overcrowd pages, if a post has more than 3 comments you can only see all of them at a full post show

#### Functionality of each post
- can click on options svg in post header to edit or delete post if post belongs to you
- can like post by double clicking on photo or clicking on heart svg 
- can click on number of likes to view modal of all users who have liked the post
- can add message to post by pressing enter of clicking post

## Status and Future Plans
Some features I am currently working on and would like to add in the future are
  - a Dark/Light Mode toggle
  - Private/Not Private - users can decide if they have a private acc in which case only friends can see your posts and message you
  - Saved posts - users can save posts that they like in their saved folder which can be accessed in their user profile page
