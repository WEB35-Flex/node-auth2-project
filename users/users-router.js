const express = require("express");

const Users = require("./users-model");

const { roleChecker } = require("../middleware/role-checker");
const { restricted } = require("../auth/restricted-middleware");

const router = express.Router();

router.get("/", restricted, roleChecker(1), (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json({ data: users });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
