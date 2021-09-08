const userData = require('../data/userData');
const bcrypt = require('bcrypt')


exports.getUsers = function (){
    return userData.getUsers();
};

exports.saveUser = async function(user){
    // console.log(await bcrypt.hash(user.senha, 10));
    user.senha = await bcrypt.hash(user.senha, 10);
    return userData.saveUser(user);
};

exports.deleteUser = function(id){
    return userData.deleteUser(id);
};

exports.getUser = function(id){
    return userData.getUser(id);
}

exports.updateUser = function(id, data){
    return userData.updateUser(id, data)
}

exports.getUserByEmail = function(email){
    return userData.getUserByEmail(email);
}