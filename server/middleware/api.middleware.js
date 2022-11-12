var validator = require("email-validator")
const bcrypt = require("bcryptjs")

const User = require("../models/User")
const Task = require("../models/Task")
const Folder = require("../models/Folder")

const apiMiddleware = {

  login: async (req, res, next) => {
    try{

      const {email, password} = req.body
      const user = await User.findOne({email})
      const isPassValid = bcrypt.compareSync(password, user.password)

      if(!(validator.validate(email))){
        console.log("Incorrect email")
        throw 'Incorrect email'
      }
      if (!isPassValid) {
        console.log("Incorrect password")
        throw 'Incorrect password'
      } 
      else {
        console.log("Login successful")
        next()
      }

    } catch (e) {
      console.log(e)
      res.status(401).json({message: 'Login error'})
    }
  },

  registration: async (req, res, next) => {
    try{

      const {email, password, name} = req.body
      const user = await User.findOne({email})

      if(!(validator.validate(email))){
        console.log("Provide a valid email address")
        throw 'Incorrect email'
      }
      if(user){
        console.log(`User ${email} already exists`)
        throw 'Incorrect email'
      }
      if((password).length < 3 && (password).length > 12){
        console.log("Password must be longer than 3 and shorter than 12 symbols")
        throw 'Incorrect password'
      }
      if(!(/^[a-zA-Z0-9]+$/.test(name))){
        console.log("Empty name")
        throw 'Wrong name'
      }
      else{
        console.log("Registration successful")
        next()
      }

    } catch (e) {
      console.log(e)
      res.status(401).json(e)
    }
  }

}


module.exports = apiMiddleware