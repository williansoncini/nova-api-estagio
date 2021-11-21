const userData = require('../../data/user/userData');
const bcrypt = require('bcrypt');


exports.getUsers = function () {
    return userData.getUsers();
};

exports.saveUser = async function (user) {
    if (user.nome == null || user.nome == '')
        return { 'status': 400, 'error': 'Informe um nome!' }

    if (user.email == null || user.email == '')
        return { 'status': 400, 'error': 'Informe um email!' }

    if (user.senha == null || user.senha == '')
        return { 'status': 400, 'error': 'Informe uma senha!' }

    if (user.confirmaSenha == null || user.confirmaSenha == '')
        return { 'status': 400, 'error': 'Informe uma confirmação de senha!' }

    if (user.departamento_id == null || user.departamento_id == '')
        return { 'status': 400, 'error': 'Informe um departamento!' }

    if (user.tipo_acesso_id == null || user.tipo_acesso_id == '')
        return { 'status': 400, 'error': 'Informe um tipo de acesso!' }

    user.nome = String(user.nome).trim()
    user.email = String(user.email).trim()
    if (user.senha !== user.confirmaSenha)
        return { 'status': 400, 'error': 'Senhas diferentes, informe senhas iguais!' }

    try {
        const existendUserEmail = await userData.getUserByEmail(user.email)
        if (existendUserEmail != null)
            return { 'status': 400, 'error': 'Este email já está sendo utilizado!' }
    } catch (error) {
        return { 'status': 400, 'error': 'Falha ao consultar usuário existente por email!' }
    }

    try {
        const existendUserName = await userData.getUserByName(user.nome)
        if (existendUserName != null)
            return { 'status': 400, 'error': 'Este nome já está sendo utilizado!' }
    } catch (error) {
        return { 'status': 400, 'error': 'Falha ao consultar usuário existente por email!' }
    }

    if (user.nome.length > 100)
        return { 'status': 400, 'error': 'Nome de usuário supera a 100 caracteres!' }

    try {
        user.senha = await bcrypt.hash(user.senha, 10);
    } catch {
        return { 'status': 400, 'error': 'Falha ao criptografar a senha!' }
    }
    // salvarLog()
    try {
        const savedUser = await userData.saveUser(user);
        return { 'status': 200, 'success': 'Usuário cadastrado com sucesso!', 'data': savedUser }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Falha ao cadastrar usuário no banco de dados!' }
    }
};

exports.deleteUser = async function (id) {
    try {
        const existentUser = await userData.getUser(id)
        if (existentUser == null)
            return { 'status': 400, 'error': 'Este usuário nã foi encontrado!' }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Falha ao buscar por usuário existente!' }
    }

    try {
        await userData.deleteUser(id);
        const existentUser = await userData.getUser(id)
        if (existentUser == null)
            return { 'status': 200, 'success': 'Usuário deletado com sucesso!' }
    } catch (error) {
        return { 'status': 400, 'error': 'Falha ao deletar usuário!' }
    }
    return userData.deleteUser(id);
};

exports.getUser = function (id) {
    return userData.getUser(id);
}

exports.updateUser = async function (id, user) {
    if (user.nome == null || user.nome == '')
        return { 'status': 400, 'error': 'Informe um nome!' }

    if (user.email == null || user.email == '')
        return { 'status': 400, 'error': 'Informe um email!' }

    if (user.senha == null || user.senha == '')
        return { 'status': 400, 'error': 'Informe uma senha!' }

    if (user.departamento_id == null || user.departamento_id == '')
        return { 'status': 400, 'error': 'Informe um departamento!' }

    if (user.tipo_acesso_id == null || user.tipo_acesso_id == '')
        return { 'status': 400, 'error': 'Informe um tipo de acesso!' }

    user.nome = String(user.nome).trim()
    user.email = String(user.email).trim()

    let existentUser = {}
    try {
        existentUser = await userData.getUser(id)
        if (existentUser == null)
            return { 'status': 400, 'error': 'Este usuário nã foi encontrado!' }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Falha ao buscar por usuário existente!' }
    }

    let oldPass = true;
    try {
        if (user.senha != 'default') {
            const duplicatePass = await bcrypt.compare(user.senha, existentUser.senha);
            if (!duplicatePass) {
                user.senha = await bcrypt.hash(user.senha, 10);
                oldPass = false;
            }
        }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Falha ao criptografar a senha!' }
    }

    try {
        if (existentUser.nome == user.nome &&
            existentUser.email == user.email &&
            existentUser.departamento_id == user.departamento_id &&
            existentUser.tipo_acesso_id == user.tipo_acesso_id &&
            oldPass &&
            existentUser.ativo == user.ativo) {
            return { 'status': 200, 'success': 'Nada alterado!' }
        }
    } catch (error) {
        console.log(error)
        return { 'status': 200, 'error': 'Falha ao comprar dados!' }
    }

    try {
        if (existentUser.email != user.email) {
            const existendUserEmail = await userData.getUserByEmail(user.email)
            if (existendUserEmail != null)
                return { 'status': 400, 'error': 'Este email já está sendo utilizado!' }
        }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Falha ao consultar usuário existente por email!' }
    }

    try {
        if (existentUser.nome != user.nome) {
            const existendUserName = await userData.getUserByName(user.nome)
            if (existendUserName != null)
                return { 'status': 400, 'error': 'Este nome já está sendo utilizado!' }
        }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Falha ao consultar usuário existente por email!' }
    }

    try {
        let alterUser = {}
        if (oldPass)
            alterUser = await userData.updateUserWithOutPass(id, user);
        else
            alterUser = await userData.updateUserWithPass(id, user);
        delete alterUser.senha
        return { 'status': 200, 'success': 'Usuário alterado com sucesso!', 'data': alterUser }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Falha ao alterar usuário no banco de dados!' }
    }
}

const getUserByEmail = function (email) {
    return userData.getUserByEmail(email);
}

exports.getUserByEmail = getUserByEmail

