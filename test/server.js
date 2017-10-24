/* eslint prefer-arrow-callback: 0 */
/* eslint object-shorthand: 0 */
const bodyParser = require('body-parser');
const upload = require('multer')();
const sleep = require('system-sleep');

function server(app, log) {
  log.info('Visiting');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, POST, GET, DELETE, OPTIONS'
    );
    res.header('Access-Control-Allow-Headers', 'Content-Type');
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

  app.post('/post/param', function(req, res) {
    res.json(req.body);
  });

  app.post('/post/formdata', upload.array(), function(req, res) {
    res.json(req.body);
  });
}

module.exports = server;
