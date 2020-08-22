import React from 'react';
import { Redirect, Route, Switch, BrowserRouter } from 'react-router-dom';

import App from './containers/App';
import NotFound from './containers/NotFound';

const Routes: React.SFC = () => (
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to="/users" />
      <Route exact path="/users" component={App} />
      <Route exact path="/repositories" component={App} />
      <Route path="*" exact component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
