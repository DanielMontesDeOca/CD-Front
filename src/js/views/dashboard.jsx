var React = require('react/addons');

var Dashboard = React.createClass({
  pageTitle: 'Dashboard',

  render() {
    return (<div className='dl-dashboard'>
      <div>
        <h1>Logged in</h1>
      </div>
    </div>);
  }
});

module.exports = Dashboard;
