const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Munip:7P4a9iIlQ7tlrXz9@munip.rxlubqg.mongodb.net/?retryWrites=true&w=majority')
mongoose.Promise = global.Promise

module.exports = mongoose