const jwt = require('jsonwebtoken');
const config= require('./jwtConfig');

module.exports.verifyFunc = (token) => {
    if(token != undefined) {
    let decoded = jwt.verify(token,config.secret);
  
    return decoded
    
    } else {
      return false;
    }
  }