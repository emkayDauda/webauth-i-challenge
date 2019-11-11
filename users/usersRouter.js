const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("./usersModel");

const users = express.Router();

users.get("/", (req, res) => {
  db.get().then(users => {
    res.status(200).json(users);
  });
});

users.post("/", validateUserBody, (req, res) => {
  db.createUser(req.valUserBody)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json({ error: true, message: err.message }));
});

function validateUserBody(req, res, next) {
  const { username, password } = req.body;

  if (!Object.keys(req.body).length) {
    res.status(404).json({ error: true, message: "Missing request body" });
  } else if (!username || !password) {
    res.status(404).json({ error: true, message: "Missing require param" });
  } else {
    const hashedPassword = bcrypt.hashSync(password, 11);
    req.valUserBody = { username, password: hashedPassword };
    next();
  }
}

module.exports = users;
