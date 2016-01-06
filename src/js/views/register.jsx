var React = require('react/addons');
var Router = require('react-router');
var {Link} = Router;

var Register = React.createClass({
  pageTitle: 'Register',

  render() {
    return (<div className='dl-dashboard'>
      <div>
        <h1>Invite only</h1>
        <div><Link to='login'>Login</Link></div>
      </div>
    </div>);
  }
});

module.exports = Register;
