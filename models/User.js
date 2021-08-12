const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt)


  next()
})

userSchema.statics.login = async function(username, password){
  const user = await this.findOne({ username });

  if(user){
    const auth =  await bcrypt.compare(password, user.password);
    if(auth){
      return user;
    }
    throw Error('Incorrect password')
  } else {
    throw Error('Username Not Found')
  }

}


const User = mongoose.model('User', userSchema)

module.exports = User;