const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id)=>{
    return jwt.sign({_id}, process.env.SECRET , {expiresIn : '3d'})
}
//login user
const loginUser = async(req, res)=>{
    //collecting data from login form
    const {email, password} = req.body
    try{
        //check if email and pass are correct in usermodel
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
    
}
//signup user
const signupUser = async(req, res)=>{
    //input email and pass from signup from
    const {email, password} = req.body
    
    try{
        //validate email and pass
        const user = await User.signup(email, password)
        // using token to show content for logined users
        const token = createToken(user._id)
        res.status(200).json({email, token})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
    // res.json({mssg: 'signup user'})
}

module.exports = {signupUser, loginUser}