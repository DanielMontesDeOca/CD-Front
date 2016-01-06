var React = require('react');
var Router = require('react-router');
var {Route, DefaultRoute} = Router;

var App = require('./app');

// views
var Login = require('./views/login.jsx');
var Register = require('./views/register.jsx');

// app views
var Dashboard = require('./views/dashboard.jsx');

var routes = (
  <Route handler={App} path='/'>
    <Route path='login' name='login' handler={Login} >
      <Route path=':forgot' handler={Login}/>
    </Route>
    <Route path='register' name='register'>
      <Route path=':tokenId' handler={Register}/>
      <DefaultRoute handler={Register}/>
    </Route>

    <Route path='dashboard' name='dashboard' handler={Dashboard} />

  <DefaultRoute handler={Login}/>
  </Route>
);

module.exports = routes;
