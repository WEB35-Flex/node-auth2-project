module.exports = {
  validateUserInputs,
};

function validateUserInputs(req, res, next) {
  const user = req.body;

  if (user.username && user.password && typeof user.password === "string") {
    next();
  } else {
    res.status(400).json({
      message:
        "Please provide username and password, the password shoud be alphanumeric",
    });
  }
}
