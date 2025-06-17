require('dotenv').config();
const bodyParser = require('body-parser');
let express = require('express');
let app = express();

absolutePath = __dirname + '/views/index.html';

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(absolutePath);
});

app.get('/json', (req, res) => {
  let message = 'Hello json';
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    message = message.toUpperCase();
  }
  res.json({ message });
});

app.get(
  '/now',
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get('/:word/echo', (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
});

app.post('/name', (req, res) => {
  const firstName = req.body.first;
  const lastName = req.body.last;

  res.json({ name: `${firstName} ${lastName}` });
});

module.exports = app;
