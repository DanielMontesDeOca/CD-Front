var express = require('express');
var compression = require('compression');
var app = express();
var DEFAULT_PORT = 4000;

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    return false;
  }

  return compression.filter(req, res);
}

app.use(compression({filter: shouldCompress}));
app.set('port', DEFAULT_PORT);
app.use('/assets', express.static(__dirname + '/assets'));

app.all('*', function fn(req, res) {
  res.sendFile('index.html', {
    root: __dirname
  });
});

app.listen(app.get('port'), function fn() {
  console.log('Continuous delivery demo');
  console.log('Express server listening on port ' + app.get('port'));
});
