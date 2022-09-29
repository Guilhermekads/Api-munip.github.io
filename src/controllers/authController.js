const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/users')

const authConfig = require('../config/auth.json')

const router = express.Router()

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret,{
        expiresIn: 253800
    })
}

router.post('/register', async (req, res)=>{
    const {cpf} = req.body
    
    try{
        if(await User.findOne({cpf})){
            return res.status(400).send({error: "User already exists"})
        }
        const user = await  User.create(req.body)
        user.password = undefined
        
        

        return res.send({user,
            token: generateToken({id: user.id})})
    }catch (err){
        return res.status(400).send({error: err})
    }
})


router.post('/transferir', async (req, res)=>{
    const {email,cpf, value} = req.body

    try{
        const user = await User.findOne({email})
        const user2 = await User.findOne({cpf})

       
        
        if(user.carbs < value){
            return  res.status(400).send({error: "Sem saldo"})
        }
        if(user.carbs >= value){
            await user.updateOne({carbs:user.carbs - value})
            await user2.updateOne({carbs:user2.carbs + value})


             return res.send({Enviado:user.name + " " + user.SecondName, Para:user2.name + " " + user2.SecondName, Quantiedade: value + " carbs"})  
        }
        

         
            
        }catch (err){
            return res.status(400).send({error: err})
        }
    
    })

    router.post('/authenticate', async (req, res)=>{
        const {cpf, password} = req.body

        const user = await User.findOne({cpf}).select('+password')

        if(!user){
        return res.status(400).send({error:"user not found"})
        }

        if(!await bcrypt.compare(password, user.password)){
            return res.status(400).send({error:"invalid password"})
        }
        user.password = undefined

        res.send({
            user,
            token: generateToken({id: user})
        })
    })

module.exports = app => app.use('/auth', router)