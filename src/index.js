const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

require('./controllers/authController')(app)
require('./controllers/projectController')(app)

app.listen(3000,
    console.log('server listening on port 3000'))