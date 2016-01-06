module.exports = {
  'Continuous delivery demo login test': function(browser) {
    browser
      .url('http://localhost:4000')
      .waitForElementVisible('.login-form', 1000)
      .assert.containsText('.login-form div:first-of-type a', 'Login')
      .assert.containsText('.login-form div:last-of-type a', 'Register')
      .end();
  }
};
