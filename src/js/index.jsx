var React = require('react');
var Router = require('react-router');
var Routes = require('./routes.jsx');

// the more common API is
Router.run(Routes, Router.HistoryLocation, (Root) => {
  React.render(<Root/>, document.querySelector('.cd-demo-app'));
});
