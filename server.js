const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const userRouter = require('./users/usersRouter')

const server = express()
server.use(express.json())
server.use(cors())
server.use(helmet())

server.use('/api/users', userRouter)

server.get('/', (req, res) => {
    res.send('Works')
})

module.exports = server