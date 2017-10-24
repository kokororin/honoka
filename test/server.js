/* eslint prefer-arrow-callback: 0 */
/* eslint object-shorthand: 0 */
const bodyParser = require('body-parser');
const sleep = require('system-sleep');

function server(app, log) {
  log.info('Visiting');
  app.use(bodyParser.json());

  app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, POST, GET, DELETE, OPTIONS'
    );
    res.header('X-Powered-By', 'Honoka Express Server');

    next();
  });

  app.get('/with/ok', function(req, res) {
    res.send('ok');
  });

  app.get('/with/json', function(req, res) {
    res.json({ hello: 'world' });
  });

  app.get('/with/error', function(req, res) {
    res.status(400);
    res.send('error');
  });

  app.get('/with/timeout', function(req, res) {
    sleep(1000);
    res.send('timeout');
  });

  app.post('/with/post', function(req, res) {
    res.send('post');
  });

  app.get('/get/query', function(req, res) {
    res.json(req.query);
  });
}

module.exports = server;
