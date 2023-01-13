const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

const requreAuth = async (req, res, next) => {

  //rverify auth

  const { authorization } = req.headers
  console.log(authorization)
  if(!authorization) {
    return res.status(401).json({error : 'Auth required'})
  }

  const token = authorization.split(' ')[1]

  try{
   const {_id} =  jwt.verify(token , process.env.SECRET)
   req.user = await User.findOne({_id}).select('_id')
   next()
  }catch(error){
    console.log(error)
    res.status(401).json({error : 'Request not Authorized'})
  }

}

module.exports = requreAuth