var jwt = require('express-jwt');

const authenticate = jwt({
  secret: process.env.jwtSecret
});

module.exports = authenticate;
