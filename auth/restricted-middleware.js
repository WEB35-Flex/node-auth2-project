const jwt = require("jsonwebtoken");

const jwtSecret = process.env.SECRET || "Keep it secret, keep it safe!";

module.exports = {
  restricted,
};

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "we wants token" });
  } else if (token) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "token bad" });
      }
      console.log("decoded token ->", decoded);
      req.decodedJwt = decoded;
      next();
    });
  }
}
