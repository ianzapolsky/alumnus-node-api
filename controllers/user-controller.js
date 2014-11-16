// User Controller

var User   = require('../models/user');

// GET
// return all users
module.exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);
    res.json(users);
  });
};

// POST
// create and save new user
module.exports.createUser = function(req, res) {
  var user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  user.save(function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'User Saved', data: user });
  });
};

// PUT 
// update information of user
module.exports.updateUser = function(req, res) {
  var user = req.user;
  user.username = req.body.username;
  user.password = req.body.password;
  user.save(function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'User Updated', data: user });
  });
};

