var Invoice = require('../models/invoice');

/* Preload invoice data method. */
function load(req, res, next, id) {
  Invoice.findOne({ _id: id, userId: req.user.id })
    .then(invoice => {
      req.dbInvoice = invoice;
      next();
    }, err => next(err));
}

/* List all invoices. */
function list(req, res, next) {
  Invoice.find({ userId: req.user.id })
  .exec((err, invoices) => {
    if (err) { return next(err); }
    res.json(invoices);
  });
}

/* Create new invoice */
function create(req, res, next) {
  // Add user id.
  req.body.userId = req.user.id

  Invoice.create(req.body)
  .then(savedInvoice => {
    return res.json(savedInvoice);
  }, err => next(err));
}

/* Get invoice. */
function get(req, res, next) {
  return res.json(req.dbInvoice);
}


function update(req, res, next) {
  const invoice = req.dbInvoice;
  Object.assign(invoice, req.body);

  invoice.save(err => {
    if (err) return next(err);
    res.sendStatus(204);
  });
}

/* Remove invoice. */
function remove(req, res, next) {
  const invoice = req.dbInvoice;
  invoice.remove().then(() => res.sendStatus(204), err => next(err));
}


module.exports = { load, list, create, get, update, remove }
