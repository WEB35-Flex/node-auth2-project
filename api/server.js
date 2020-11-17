const express = require("express");

const helmet = require("helmet");

const cors = require("cors");

const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/users-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

const message = process.env.MESSAGE;

server.get("/", (req, res) => {
  res.send(message);
});

module.exports = server;
