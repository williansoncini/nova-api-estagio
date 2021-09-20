const crypto = require('crypto');

exports.generateRandomString = function(){
    return crypto.randomBytes(20).toString('hex');
}
