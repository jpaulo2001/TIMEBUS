const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1]
    const decode = jwt.verify(token, 'private key :) I hope no one knows me')
    console.log(decode)
    req.user = decode
    next()
  }
  catch(error){
    res.json({
      message: 'Authentication Failed!'
    })
  }
}

module.exports = authenticate
