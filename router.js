// Router

var express        = require('express');
var router         = express.Router();

// middleware
var jwtAuth        = require('./middleware/jwt-auth');
var requireAuth    = require('./middleware/require-auth');

// controllers
var authController = require('./controllers/auth-controller');
var userController = require('./controllers/user-controller');

// authentication
router.route('/auth/login')
  .get(authController.getToken)
  .post(authController.getToken);

// users
router.route('/users')
  .get(jwtAuth, requireAuth, userController.getUsers)
  .post(userController.createUser)
  .put(jwtAuth, requireAuth, userController.updateUser);

router.route('/secret')
  .get(jwtAuth, requireAuth, function(req, res) {
    res.send('Hello ' + req.user.username);
  });

module.exports = router;

