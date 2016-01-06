var React = require('react/addons');
var Router = require('react-router');
var {Link} = Router;

var LoginForm = React.createClass({

  getInitialState() {
    return {};
  },

  render() {
    return (<div className='dl-login-form'>
      <h1>Login</h1>
      <div><Link to='dashboard'>Login</Link></div>
      <div><Link to='register'>Register</Link></div>
    </div>);
  }
});

module.exports = LoginForm;
