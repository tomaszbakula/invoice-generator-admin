require('dotenv').config()
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var routes = require('./routes');

// Database connection.
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_HOST);

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.end('Welcome!')
})

// Mount all routes on /api path.
app.use('/api', routes);

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message });
});

module.exports = app;
