// JWT Auth

var url    = require('url');
var User   = require('../models/user');
var jwt    = require('jwt-simple');
var config = require('../config');

module.exports = function(req, res, next) {

  var parsed_url = url.parse(req.url, true);

  // the token could be in POST, GET parameter, or x-access-token header
  var token = (req.body && req.body.access_token) || parsed_url.query.access_token || req.headers["x-access-token"];

  if (token) {

    try {
      var decoded = jwt.decode(token, config.jwtTokenSecret);

      // token is expired
      if (decoded.exp <= Date.now())
        res.end('Access Token Has Expired', 400);
      User.findOne({ '_id': decoded.iss }, function(err, user) {
  
        // user is not valid
        if (err)
          res.end('Unauthorized Access', 401);
        req.user = user;
        return next();
      });
    } catch (err) {
      return next();
    }
  } else {
    next();
  }
};
