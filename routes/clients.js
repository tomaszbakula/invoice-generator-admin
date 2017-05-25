var express = require('express'),
    router = express.Router();
var Client = require('../controllers/client');

router.route('/')
  /* GET /api/clients - Get list of clients. */
  .get(Client.list)

module.exports = router;
