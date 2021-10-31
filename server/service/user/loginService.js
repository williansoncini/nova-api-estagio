// const userData = require('../data/userData')
const userService = require('../../service/user/userService')
const bcrypt = require('bcrypt')
const jwt = require('../../infra/provider/jwt')

exports.login = async function (email, password) {
    let userLogin
    try {
        userLogin = await userService.getUserByEmail(email);
        if (userLogin == null)
            return { 'status': 400, 'error': 'Email ou senha incorretos!' }
    } catch (error) {
        return { 'status': 400, 'error': 'Falha ao consultar usuário!' }
    }

    try {
        const validPass = await bcrypt.compare(password, userLogin.senha);
        if (!validPass)
            return { 'status': 400, 'error': 'Email ou senha incorretos!' }
    } catch (error) {
        return { 'status': 400, 'error': 'Falha ao criptografar senha!' }
    }

    try {
        const token = jwt.sign({ user: userLogin.id });
        delete userLogin.senha
        userLogin.token = token;
        console.log(userLogin)
        return { 'status': 200, 'success': 'Login efetuado com sucesso!', 'data': userLogin }
    } catch (error) {
        return { 'status': 400, 'error': 'Falha ao logar!' }
    }
}
