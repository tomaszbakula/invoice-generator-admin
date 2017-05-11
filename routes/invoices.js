var express = require('express'),
    router = express.Router();
var Invoice = require('../controllers/invoice');

router.route('/')
  /* GET /api/invoices - Get list of invoices. */
  .get(Invoice.list)
  /* POST /api/invoices - Create new invoice. */
  .post(Invoice.create);

router.route('/:invoiceId')
  /* GET /api/invoices/:invoiceId - Get invoice. */
  .get(Invoice.get)
  /* PUT /api/invoices/:invoiceId - Update invoice. */
  .put(Invoice.update)
  /* DELETE /api/invoices/:invoiceId - Delete invoice. */
  .delete(Invoice.remove);

/** Load invoice when API with invoiceId route parameter is hit. */
router.param('invoiceId', Invoice.load);


module.exports = router;
