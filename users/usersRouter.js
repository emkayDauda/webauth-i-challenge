const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("./usersModel");

const users = express.Router();

users.get("/", restricted, (req, res) => {
  db.get().then(users => {
    res.status(200).json(users);
  });
});

users.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.json('you can not leave, actually')
      } else {
        res.json('goodbye, sad to see you go')
      }
    })
  } else {
    res.end();
  }
})

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
    .then(user => {
      req.session.user = user;
      res.status(201).json(user)
    })
    .catch(err => res.status(500).json({ error: true, message: err.message }));
});

users.post("/login", validateUserBody, (req, res) => {
  let { username, password } = req.body;
  db.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
          req.loggedInResponse = {
            error: false,
            message: `Welcome, ${user.username}`,
            data: user
          }
          req.session.user = user;
          res.status(200).json(req.loggedInResponse);  
      } else {
        res.status(404).json({ error: true, message: `Invalid credentials` });
      }
    })
    .catch(err => res.status(404).json({ error: true, message: err.message }));
});

function restricted(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'No credentials provided' });
  }
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
