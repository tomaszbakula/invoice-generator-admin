var express = require('express'),
    router = express.Router();
var Auth = require('../controllers/auth');

router.route('/token')
  /* POST /api/auth/token - Get JWT authentication token */
  .post( Auth.authenticate, Auth.generateToken, Auth.respondJWT );

module.exports = router;
