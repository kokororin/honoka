/* eslint prefer-arrow-callback: 0 */
/* eslint object-shorthand: 0 */
const bodyParser = require('body-parser');
const cors = require('cors');
const upload = require('multer')();

function server(app) {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.get('/with/ok', function (req, res) {
    res.send('ok');
  });

  app.get('/with/json', function (req, res) {
    res.json({ hello: 'world' });
  });

  app.get('/with/blob', function (req, res) {
    const data = 'R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    const img = new Buffer(data, 'base64');
    res.writeHead(200, {
      'Content-Type': 'image/gif',
      'Content-Length': img.length
    });
    res.end(img);
  });

  app.get('/with/error', function (req, res) {
    res.status(400);
    res.send('error');
  });

  app.get('/with/timeout', function (req, res) {
    setTimeout(() => {
      res.send('timeout');
    });
  });

  app.post('/with/post', function (req, res) {
    res.send('post');
  });

  app.get('/get/query', function (req, res) {
    res.json(req.query);
  });

  app.get('/get/header', function (req, res) {
    res.json(req.headers);
  });

  app.post('/post/header', function (req, res) {
    res.json(req.headers);
  });

  app.post('/post/param', function (req, res) {
    res.json(req.body);
  });

  app.post('/post/formdata', upload.array(), function (req, res) {
    res.json(req.body);
  });
}

server.port = 3001;

module.exports = server;
