module.exports = function isAuthorized(req, res, next) {
  if (req.user && req.user.type === 'admin') {
    next()
  } else {
    res.send(401, 'Unauthorized')
  }
}
