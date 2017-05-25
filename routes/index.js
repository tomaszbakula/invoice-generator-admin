var express = require('express');
var router = express.Router();
var auth = require('../config/jwt');

// TODO: Add validation layer for endpoints.

router.use('/auth', require('./auth'));

router.use('/users', auth.unless({
  path: [{ url: '/api/users', methods: ['POST'] }]
}), require('./users'));

router.use('/invoices', auth, require('./invoices'));

router.use('/clients', require('./clients'));

module.exports = router;
