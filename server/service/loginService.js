// const userData = require('../data/userData')
const userService = require('../service/userService')
const bcrypt = require('bcrypt')
const jwt = require('../infra/jwt')

exports.login = async function (user){
    const userLogin = await userService.getUserByEmail(user.email);
    if (userLogin){
        const validPass = await bcrypt.compare(user.senha,userLogin.senha);
        if (validPass){
            const token = jwt.sign({user: userLogin.id});
            // console.log(token)
            return {userLogin, token}
        }
        else
            return 'Email ou senha incorretos!'
    }
}
