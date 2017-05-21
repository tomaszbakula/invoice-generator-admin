var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ClientSchema = new Schema({
  firstName: String,
  lastName: String,
  phone: String,
  logo: String,
  address: {
    street: String,
    city: String,
    postcode: String,
    state: String,
    country: String,
  }
});

module.exports = mongoose.model('Client', ClientSchema);
