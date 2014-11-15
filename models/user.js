// User Model

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');
var Schema   = mongoose.Schema;
var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
});

UserSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password'))
    return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err)
      return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err)
        return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
 
  // compare the candidatePassword against the hash of the original password
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err)
      return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);

