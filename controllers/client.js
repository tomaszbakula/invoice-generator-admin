var Client = require('../models/client');

/* List clients. */
function list(req, res, next) {

  Client.find({ $or: [
    { 'firstName': { $regex: req.query.q, $options: 'i' }},
    { 'lastName': { $regex: req.query.q, $options: 'i' }}
  ] })
  .exec(function(err, clients) {
    res.json(clients)
  })

}

module.exports = { list }
