var React = require('react/addons');
var Components = require('../lib/components.js');
var {LoginForm} = Components;

var Login = React.createClass({
  getInitialState() {
    return {};
  },

  render() {
    return (<div className='dl-login'>
      <div>
        <div className='dl-login-container'>
            <div>
              <LoginForm />
            </div>
        </div>
      </div>
    </div>);
  }
});

module.exports = Login;
