const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("./usersModel");

const users = express.Router();

users.get("/", restricted, (req, res) => {
  db.get().then(users => {
    res.status(200).json(users);
  });
});

users.get("/:id", restricted, (req, res) => {
    db.get(req.params.id).then(users => {
      if(users) {
        res.status(200).json(users);
      }
      else res.status(200).json({error: true, message: "User with that Id not found"})
    });
  });

users.post("/register", validateUserBody, (req, res) => {
  db.createUser(req.valUserBody)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json({ error: true, message: err.message }));
});

users.post("/login", validateUserBody, restricted, (req, res) => {
    res.status(200).json(req.loggedInResponse);  
});

function restricted(req, res, next) {
    let { username, password } = req.body;

    if (!username || !password) {
        username = req.headers.username
        password = req.headers.password
    }

  db.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
          req.loggedInResponse = {
            error: false,
            message: `Welcome, ${user.username}`,
            data: user
          }
          next()
      } else {
        res.status(404).json({ error: true, message: `Invalid credentials` });
      }
    })
    .catch(err => res.status(404).json({ error: true, message: err.message }));
}

function validateUserBody(req, res, next) {
  const { username, password } = req.body;

  if (!Object.keys(req.body).length) {
    res.status(404).json({ error: true, message: "Missing request body" });
  } else if (!username || !password) {
    res.status(404).json({ error: true, message: "Missing require param" });
  } else {
    const hashedPassword = bcrypt.hashSync(password, 11);
    req.valUserBody = { username, password: hashedPassword };
    req.valUserBodyUnhashed = { username, password };
    next();
  }
}

module.exports = users;
