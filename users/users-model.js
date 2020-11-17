const db = require("../data/connection");

module.exports = {
  find,
  add,
  findBy,
};

function find() {
  return db("users");
}

function add(user) {
  return db("users").insert(user);
}

function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}
