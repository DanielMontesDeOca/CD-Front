module.exports = {
  'Continuous delivery demo login test': function(browser) {
    browser
      .url('http://localhost:4000')
      .expect.element('#main').to.be.present;
  }
};
