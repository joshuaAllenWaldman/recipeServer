const User = require("../models/User")
const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'gooble gobble lim lim', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

const checkUser = (req, res, next) => {
  // const token = req.jwt;
  // console.log("checkUser ",req.cookies)
  // if(token){
  //   jwt.verify(token, 'gooble gobble lim lim', async (err, decodedToken) => {
  //     if(err){
  //       console.log(err.message);
  //       req.user = null;
  //       next()
  //     } else {
        
  //       let user = await User.findById(decodedToken.id)
  //       req.user = user;
  //       next();
  //     }
  //   })
  // } else {
  //   req.user = null;
  //   next();
  // }
  next();
}

module.exports = {
  requireAuth,
  checkUser
}