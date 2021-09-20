const jwt = require('jsonwebtoken');

const secret = '!#FSDFgQ@#R@323423ok4123!#Ad!#F';

exports.sign = function(payload){
    return jwt.sign(payload,secret, {expiresIn : 86400});
}

exports.verify = function(token){
    return jwt.verify(token, secret)
} 
    
exports.destroy = function(token){
    return jwt.destroy(token)
}
