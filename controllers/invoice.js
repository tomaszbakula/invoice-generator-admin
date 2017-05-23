var Invoice = require('../models/invoice');
var Client = require('../models/client');

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
  let limit = 10
  let offset = req.query.page * limit

  Invoice.find({ userId: req.user.id })
  .skip(offset)
  .limit(limit)
  .sort('-issueDate')
  .exec((err, invoices) => {
    if (err) { return next(err); }

    // NOTE: I'm not sure if this is the best way to handle pagination.
    Invoice.count({ userId: req.user.id }).then(count => {
      count = Math.ceil(count / limit)
      invoices.push({ count: count  })

      res.json(invoices)
    })
  })
}

/* Create new invoice */
function create(req, res, next) {
  // Add user id to reqest.
  req.body.userId = req.user.id

  Invoice.create(req.body)
  .then(invoice => {

    // Add new client.
    if (!req.body.clientId) {
      Client.create(req.body.client)
      .then(client => {
        invoice.client.id = client._id
        invoice.save()

        return res.json(invoice)
      }, err => next(err))
    }
    else {
      return res.json(invoice)
    }

  }, err => next(err))
}

/* Get invoice. */
function get(req, res, next) {
  return res.json(req.dbInvoice);
}

/* Update invoice. */
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
