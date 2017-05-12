var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InvoiceSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  // clientId: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'clients'
  // },
  number: {
    type: String,
    required: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  items: [{
    name: String,
    price: Number,
    qty: Number
  }]
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
