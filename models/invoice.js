var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InvoiceSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  company: {
    name: String,
    phone: String,
    address: {
      street: String,
      city: String,
      postcode: String,
      state: String,
      country: String
    }
  },
  client: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'clients'
    },
    firstName: String,
    lastName: String,
    phone: String,
    address: {
      street: String,
      city: String,
      postcode: String,
      state: String,
      country: String
    }
  },
  invoiceNumber: String,
  issueDate: {
    type: Date,
    default: Date.now
  },
  items: [{
    name: String,
    price: Number,
    qty: Number
  }],
  total: Number
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
