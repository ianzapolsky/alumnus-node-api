// Router

var express        = require('express');
var router         = express.Router();
var jwtauth        = require('./middleware/jwtauth');
var requireAuth    = require('./middleware/requireauth');
var authController = require('./controllers/auth-controller');
var userController = require('./controllers/user-controller');

router.route('/auth/login')
  .get(authController.getToken)
  .post(authController.getToken);

router.route('/users')
  .get(jwtauth, requireAuth, userController.getUsers)
  .post(userController.createUser);

module.exports = router;

