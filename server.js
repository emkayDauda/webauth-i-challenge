const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const session = require('express-session');

const userRouter = require('./users/usersRouter')

const server = express()
server.use(express.json())
server.use(cors())
server.use(helmet())


const sessionConfig = {
    name: 'aWeirdName',
    secret: process.env.SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60, // you need it if the cookie is to survive !!
      secure: false, // with secure, the cookie only gets set when https !!
      httpOnly: false,
    },
    resave: false,
    saveUninitialized: false,
  }

  server.use(session(sessionConfig));
server.use('/api/users', userRouter)

server.get('/', (req, res) => {
    res.send('Works')
})

module.exports = server