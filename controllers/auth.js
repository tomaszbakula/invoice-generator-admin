var jwt = require('jsonwebtoken');
var User = require('../models/user');

function authenticate(req, res, next) {
  User.findOne({
    username: req.body.username
  })
  .exec(function (err, user) {
    if (err) return next(err);
    if (!user) return next();
    user.comparePassword(req.body.password, (e, isMatch) => {
      if (e) return next(e);
      if (isMatch) {
        req.user = user;
        next();
      } else {
        return next();
      }
    });
  });
}

function generateToken(req, res, next) {
  if (!req.user) return next();

  const jwtPayload = {
    id: req.user._id
  };
  const jwtData = {
    expiresIn: process.env.jwtDuration,
  };
  const secret = process.env.jwtSecret;
  req.token = jwt.sign(jwtPayload, secret, jwtData);

  next();
}

function respondJWT(req, res) {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' });
  } else {
    res.status(200).json({ token: req.token });
  }
}

module.exports = { authenticate, generateToken, respondJWT }
