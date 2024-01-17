const mongoose = require('mongoose')
const Schema = mongoose.Schema
//bcrypt is hashing function to secure password in database
const bcrypt = require('bcrypt')
//we are using validator inorder to accept only valid email and passwords instead of requiring to learn complicated regex
const validator = require('validator')
const userSchema = new Schema({
    email :{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

//create our own custom funcion in mongoose
//we used function instead of arrow function as we are using this keyword here
//in arrow function we cannot use this keyword
userSchema.statics.signup = async function(email, password){
    //validation
    if(!email || !password){
        throw Error("All fields must be filled")
    }
    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong enough")
    }

    const exists = await this.findOne({email})
    if(exists){
        throw Error("Email already in use")
    }
    //salt is extra characters added to password for more security
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})
    
    return user
}
userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error("All fields must be filled")
    }
    const user = await this.findOne({email})
    if(!user){
        throw Error("Incorrect Email")
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error("Incorrect Password")
    }
    return user
}
module.exports = mongoose.model('User', userSchema)