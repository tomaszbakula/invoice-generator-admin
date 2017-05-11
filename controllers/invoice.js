var Invocie = require('../models/invoice');
// TODO: req.dbUser = user
function load(req, res, next, id) {
  Invoice.findById(id).exec(function (err, invoice) {
    req.dbUser = user;
  });
}

function list(req, res, next) {
  Invocie.find({ userId: req.user.id }).exec(function (err, invoices) {
    if (err) { return next(err); }
    res.json(invoices);
  });
}

function create(req, res, next) {

  Invocie.create({
    userId: req.user.id,
    clientId: req.body.clientId,
    number: 1,
    items: [
      { name: 'Opony', price: '20', qty: 4 },
      { name: 'Opony zimowe', price: '30', qty: 2 }
    ]
  }, function (err, invoice) {
    if (err) { return next(err); }
    res.json(invoice);
  });

}

function get(req, res, next) {}
function update(req, res, next) {}
function remove(req, res, next) {}


module.exports = { load, list, create, get, update, remove }
