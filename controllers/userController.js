
const db = require('../models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');



// JSON WEB TOKEN CREATION
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  })
}


// Auth Controllers
const signup = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const user = await db.User.create({ username, email, password});
    if(user){
      const token = createToken(user._id)
    res.status(201).json({ user: user._id, token: token })
    }
    
  } 
  catch(err) {
    console.log(err)
  }
  
}

const login = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const user = await db.User.login(username, password)
    if(user){
      const token = createToken(user._id)
      res.status(201).json({ user: user._id, username: user.username, token: token})
    }
  } 
  catch(err) {
    res.status(400).json({})
  }

}

const logout = async (req, res) => {
    res.send('Logged out')
  // need to redirect here
}


module.exports = {
  signup,
  login,
  logout
}