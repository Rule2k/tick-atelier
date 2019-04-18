import React from 'react';
import PropTypes from 'prop-types';

import Home from 'src/routes/Home';
import NotFound from 'src/routes/NotFound';
import NewTicket from 'src/routes/NewTicket';
import EditTicket from 'src/routes/EditTicket';
import BackOffice from 'src/containers/BackOffice/LoadUsersPromosProjectSpe';
import AddUser from 'src/routes/BackOffice/AddUser';
import AddPromo from 'src/routes/BackOffice/AddPromo';
import AddSpe from 'src/routes/BackOffice/AddSpe';
import AddProject from 'src/routes/BackOffice/AddProject';
import SpeProjectList from 'src/routes/BackOffice/SpeProjectList';
import { Breakpoint } from 'react-socks';
import { Route, Switch } from 'react-router-dom';
import ShowOneTicket from 'src/containers/ShowOneTicket/ShowOneTicket';

import './app.scss';
import './app_mobile.scss';

const App = ({ admin }) => (
  <div>
    <Breakpoint medium down>
      <div id="app-mobile">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/new-ticket" component={NewTicket} />
          <Route
            exact
            path="/show-ticket/:slug"
            component={ShowOneTicket}
          />
          <Route exact path="/edit/:slug" component={EditTicket} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Breakpoint>
    <Breakpoint large up>
      <div id="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/new-ticket" component={NewTicket} />
          <Route
            exact
            path="/show-ticket/:slug"
            component={ShowOneTicket}
          />
          <Route exact path="/edit/:slug" component={EditTicket} />
          {admin && <Route exact path="/admin" component={BackOffice} />}
          {admin && <Route exact path="/admin/add-user" component={AddUser} />}
          {admin && <Route exact path="/admin/add-promo" component={AddPromo} />}
          {admin && <Route exact path="/admin/add-spe" component={AddSpe} />}
          {admin && <Route exact path="/admin/add-project" component={AddProject} />}
          {admin && <Route exact path="/admin/list" component={SpeProjectList} />}
          <Route component={NotFound} />
        </Switch>
      </div>
    </Breakpoint>
  </div>
);

App.propTypes = {
  admin: PropTypes.bool.isRequired,
};

export default App;
