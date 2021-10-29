const userData = require('../../data/user/userData');
const bcrypt = require('bcrypt');


exports.getUsers = function (){
    return userData.getUsers();
};

exports.saveUser = async function(user){
    user.nome = String(user.nome).trim()
    user.email = String(user.email).trim()
    try {
        const existendUserEmail = await userData.getUserByEmail(user.email)
        if (existendUserEmail != null)
            return {'status':400,'error':'Este email já está sendo utilizado!'}
    } catch (error) {
        return {'status':400,'error':'Falha ao consultar usuário existente por email!'}
    }

    try {
        const existendUserName = await userData.getUserByName(user.nome)
        if (existendUserName != null)
            return {'status':400,'error':'Este nome já está sendo utilizado!'}
    } catch (error) {
        return {'status':400,'error':'Falha ao consultar usuário existente por email!'}
    }

    if(user.nome.length > 100)
        return {'status':400,'error':'Nome de usuário supera a 100 caracteres!'}

    try{
        user.senha = await bcrypt.hash(user.senha, 10);
    }catch{
        return {'status':400,'error':'Falha ao criptografar a senha!'}
    }
    // salvarLog()
    try {
        const savedUser = await userData.saveUser(user);
        return {'status':200, 'success':'Usuário cadastrado com sucesso!', 'data':savedUser}
    } catch (error) {
        console.log(error)
        return {'status':400,'error':'Falha ao cadastrar usuário no banco de dados!'}
    }
};

exports.deleteUser = function(id){
    return userData.deleteUser(id);
};

exports.getUser = function(id){
    return userData.getUser(id);
}

exports.updateUser = async function(id, user){
    user.senha = await bcrypt.hash(user.senha, 10);
    return userData.updateUser(id, user)
}

const getUserByEmail = function(email){
    return userData.getUserByEmail(email);
}

exports.getUserByEmail = getUserByEmail

