import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from '../Routes/Auth';
import Feed from '../Routes/Feed';
import DirectInbox from '../Routes/Messaging/DirectInbox';
import DirectChat from '../Routes/Messaging/DirectChat';
import Explore from "../Routes/Explore";
import Search from "../Routes/Search/index";
import Profile from "../Routes/Profile/index";
import Suggested from "../Routes/Suggested";
import Upload from "../Routes/Upload";
import Notifications from "../Routes/Notifications";
import EditProfile from "../Routes/Profile/EditProfile";
import ShowPost from "../Routes/ShowPost";

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" component={Feed} />
    <Route path="/explore" component={Explore} />
    <Route exact path="/direct" component={DirectInbox} />
    <Route path="/suggested" component={Suggested} />
    <Route path="/search" component={Search} />
    <Route path="/upload" component={Upload} />
    <Route path="/notifications" component={Notifications} />
    <Route path="/editprofile" component={EditProfile} />
    <Route exact path="/:username" component={Profile} />
    <Route exact path="/p/:postId" component={ShowPost} />
    <Route exact path="/direct/t/:roomId" component={DirectChat} />
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppRouter;