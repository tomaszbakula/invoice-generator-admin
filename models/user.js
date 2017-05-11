var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  phone: String,
  street: String,
  city: String,
  postcode: String,
  state: String,
  country: String,
  companyName: String,
  logo: String
});

UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) { return next(); }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (hashErr, hash) => {
      if (hashErr) return next(hashErr);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (toCompare, done) {
  bcrypt.compare(toCompare, this.password, (err, isMatch) => {
    if (err) done(err);
    else done(err, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
