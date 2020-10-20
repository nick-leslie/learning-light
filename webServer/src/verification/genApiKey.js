const jwt = require('jsonwebtoken');
const config = require('./jwtConfig');

module.exports.addNewKey = (teacher,stat) => {
    console.log(teacher + " this is in token hand out")
    var token = jwt.sign({teacher:teacher,status:stat},config.secret, {
        expiresIn:86400
    })
    return token
}