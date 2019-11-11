require('dotenv').config()

const app = require('./server')

const port = process.env.port

app.listen(port, () => console.log(`Listening on port ${port}`))