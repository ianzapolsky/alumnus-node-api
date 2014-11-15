// Auth Controller

var User   = require('../models/user');
var jwt    = require('jwt-simple');
var moment = require('moment');
var config = require('../config');

module.exports.getToken = function(req, res) {
  User.findOne({ username: req.body.username }, function(err, user) {
    
    // user does not exist
    if (err)
      res.send(err);
    if (!user) {
      res.status(401).send('Invalid User');
      return;
    }
    user.comparePassword(req.body.password, function(err, isMatch) {
      if (err)
        res.send(err);

      // wrong password
      if (!isMatch) {
        res.status(401).send('Not Authorized');
        return;
      }

      // generate token
      var expires = moment().add(7, 'days').valueOf();
      var token = jwt.encode({
        iss: user.id,
        exp: expires,
      }, config.jwtTokenSecret);

      // return token to client
      res.json({ token: token, expires: expires, user: user.toJSON() });
    });
  });
};
