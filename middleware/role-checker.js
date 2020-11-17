module.exports = {
  roleChecker,
};

function roleChecker(role) {
  return function (req, res, next) {
    if (req.decodedJwt.role === role) {
      next();
    } else {
      res.status(401).json({ message: "not authorized" });
    }
  };
}
