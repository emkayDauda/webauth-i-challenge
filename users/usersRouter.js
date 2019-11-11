const express = require('express')

const db = require('./usersModel')

const users = express.Router()

users.get('/', (req, res) => {
    db.get()
    .then(users => {
        res.status(200).json(users)
    })
})

module.exports = users;