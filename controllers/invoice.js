var Invocie = require('../models/invoice');

/* Preload invoice data method. */
function load(req, res, next, id) {
  Invoice.findById(id).exec(function (err, invoice) {
    req.dbInvoice = invoice;
  });
}

/* List all invoices. */
function list(req, res, next) {
  Invocie.find({ userId: req.user.id })
  .exec((err, invoices) => {
    if (err) { return next(err); }
    res.json(invoices);
  });
}

/* Create new invoice */
function create(req, res, next) {
  // Add user id.
  req.body.userId = req.user.id

  Invocie.create(req.body)
  .then((savedInvoice) => {
    return res.json(savedInvoice);
  }, (err) => next(err));
}

function get(req, res, next) {}
function update(req, res, next) {}
function remove(req, res, next) {}


module.exports = { load, list, create, get, update, remove }
