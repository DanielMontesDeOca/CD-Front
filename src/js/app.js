/*! Copyright (c) 2015 Digitory Legal.  All Rights Reserved. */
var React = require('react/addons');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Config = require('./config/config.js');

var App = React.createClass({

  getInitialState() {
    return {};
  },

  onLogin() {
    this.transitionTo('/dashboard');
  },

  onLogout() {
    this.transitionTo('/login');
  },

  setWindowTitle(title = '') {
    document.title = title + (title !== '' ? ' - ' : '') + Config.app_name;
  },

  render() {
    return (
      <div className='landing-view'>
        <RouteHandler/>
      </div>
    );
  }
});

module.exports = App;
