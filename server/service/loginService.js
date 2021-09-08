// const userData = require('../data/userData')
const userService = require('../service/userService')
const bcrypt = require('bcrypt')


exports.login = async function (user){
    const userLogin = await userService.getUserByEmail(user.email);
    if (userLogin){
        const validPass = await bcrypt.compare(user.senha,userLogin.senha);
        if (validPass)
            return 'Sucesso!'
        else
            return 'Email ou senha incorretos!'
    }
}

// const bcryptProvider = new BcryptProvider();
// const tokenProvider = new TokenProvider();
