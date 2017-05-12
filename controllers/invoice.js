var Invocie = require('../models/invoice');

/* Preload invoice data method. */
function load(req, res, next, id) {
  Invoice.findById(id).exec(function (err, invoice) {
    req.dbInvoice = invoice;
  });
}

/* List all invoices. */
function list(req, res, next) {
  Invocie.find().exec((err, invoices) => {
    if (err) { return next(err); }
    res.json(invoices);
  });
}

/* Create new invoice */
function create(req, res, next) {
  Invocie.create({
    userId: req.user.id,
    number: req.body.number,
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
