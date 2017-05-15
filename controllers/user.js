var User = require('../models/user');

/* Preload user data method. */
function load(req, res, next, id) {
  id = 'profile' == id ? req.user.id : id;

  User.findById(id)
    .exec((err, user) => {
      if (err) { next(err) }
      if (!user) {
        return res.status(404).json({
          status: 400,
          message: "User not found"
        });
      }
      req.dbUser = user;
      return next();
    });
}

/* List all users method. */
function list(req, res, next) {
  User.find().exec(function (err, users) {
    if (err) { return next(err); }
    res.json(users);
  });
}

/* Create user method. */
function create(req, res, next) {
  User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  },
  function (err, user) {
    if (err) { return next(err); }
    res.json(user);
  });
}

/* Get user by id method. */
function get(req, res, next) {
  return res.json(req.dbUser);
}

/* Update user method. */
function update(req, res, next) {
  const user = req.dbUser;

  if (req.file) {
    req.body.logo = 'uploads/' + req.file.filename;
  }

  Object.assign(user, req.body);

  user.save(function (err) {
    if (err) { return next(err); }
    res.sendStatus(204);
  });
}

/* Remove user. */
function remove(req, res, next) {
  const user = req.dbUser;
  user.remove().then(() => res.sendStatus(204), err => next(err));
}

module.exports = { load, list, create, get, update, remove }
