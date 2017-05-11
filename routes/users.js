var express = require('express'),
    router = express.Router();
var User = require('../controllers/user');

var multer  = require('multer')
var crypto = require('crypto');
var path = require('path');

var storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

var upload = multer({ storage: storage })

// TODO: Handle logo upload.

router.route('/')
  /* GET /api/users - Get list of users. */
  .get(User.list)
  /* POST /api/users - Create new user. */
  .post(User.create);

router.route('/:userId')
  /* GET /api/users/:userId - Get user. */
  .get(User.get)
  /* PUT /api/users/:userId - Update user. */
  .put(upload.single('logo'), User.update)
  /* DELETE /api/users/:userId - Delete user. */
  .delete(User.remove);

/** Load user when API with userId route parameter is hit. */
router.param('userId', User.load);

module.exports = router;
