module.exports = {
  'Continuous delivery demo login test': function(browser) {
    browser
      .url('http://localhost:4000')
      .expect.element('body').to.be.present;
  }
};
