// Require Auth

module.exports = function(req, res, next) {
  if (!req.user) {
    res.end('Not Authorized', 401);
  } else {
    next();
  }
};
