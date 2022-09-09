const mongoose = require('../database/index')

const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    SecondName:{
        type: String,
        require: true
    },
    cpf: {
        type: String,
        require: true,
        unique: true
    },
    email:{
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        require: true,
        select: false
    },
    carbs:{
        type: Number,
    },
    CreatedAt:{
        type: Date,
        default: Date.now
    },
})

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
})

const User = mongoose.model('User', UserSchema)

module.exports = User