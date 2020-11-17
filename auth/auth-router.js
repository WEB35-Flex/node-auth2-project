const express = require("express");

const bcrypt = require("bcryptjs");

const Users = require("../users/users-model");

const { validateUserInputs } = require("../middleware/validate-user-inputs");

const { makeToken } = require("../auth/make-token");

const router = express.Router();

router.post("/register", validateUserInputs, (req, res) => {
  const { username, password, role } = req.body;

  const rounds = parseInt(process.env.BCRYPT_ROUNDS) || 10;

  const hash = bcrypt.hashSync(password, rounds);
  const user = { username, password: hash, role };

  Users.add(user)
    .then((id) => {
      res.status(201).json({
        message: `registration successful, your new user id is ${id}`,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username: username })
    .then((users) => {
      const user = users[0];

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = makeToken(user);

        res
          .status(200)
          .json({ message: `Welcome back ${user.username}!`, token });
      } else {
        res.status(401).json({ message: "Invalid credentials " });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
