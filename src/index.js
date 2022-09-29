const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

require('./controllers/authController')(app)
require('./controllers/projectController')(app)

app.listen(process.env.PORT || 3000)