const userService = require('../service/userService');
const {generateRandomString} = require('../infra/crypto')
const {request, requestBasicLogin, requestWithToken} = require('../infra/axios')

const makeLoginAndReturnToken = async function(data){
    let responseLogin = await requestBasicLogin('login',data);
    responseLoginData = responseLogin.data;
    return responseLoginData.token
}

const dataUser = function(){
    return {
        nome:generateRandomString(),
        email:generateRandomString(),
        ativo: '1',
        senha:generateRandomString(),
        departamento_id:3
    };
}

test('Coletar usuários', async function (){
    const data = dataUser()
    const saveUser = await request('users','post', data); 
    const newUser = saveUser.data;

    const token = await makeLoginAndReturnToken(data)

    const response = await requestWithToken('users', 'get',{},token);
    const length = (response.data).length;
    expect(length).not.toBe(0);
    await userService.deleteUser(newUser.id);
});

test('Salvar usuário', async function (){
    const data = dataUser()
    const response = await request('users','post', data); 
    const user = response.data;
    expect(user.nome).toBe(data.nome);
    expect(user.email).toBe(data.email);
    await userService.deleteUser(user.id);
});

test('Alterar usuário', async function (){
    const data = dataUser()
    const responseSave = await request('users','post',data);
    const newUser = responseSave.data;

    const token = await makeLoginAndReturnToken(data)

    newUser.nome = generateRandomString();
    newUser.email = generateRandomString();
    newUser.senha = generateRandomString();

    await requestWithToken(`users/${newUser.id}`,'put',newUser, token); 
    const responsePut = await requestWithToken(`users/${newUser.id}`, 'get',{},token)
    const updatedUser = responsePut.data;
    expect(updatedUser.nome).toBe(newUser.nome)
    expect(updatedUser.email).toBe(newUser.email)
    await userService.deleteUser(updatedUser.id);
});

test('Não foi possível consultar apenas 1 usuário', async function (){
    const data = dataUser()
    const responseSaveUser = await request('users','post', data); 
    const savedUser = responseSaveUser.data;

    const token = await makeLoginAndReturnToken(data)

    const responseGetOneUser = await requestWithToken(`users/${savedUser.id}`, 'get', {}, token)
    const oneUser = responseGetOneUser.data;
    expect(oneUser.id).toBe(savedUser.id);
    expect(oneUser.nome).toBe(savedUser.nome);
    expect(oneUser.email).toBe(savedUser.email);
    await userService.deleteUser(savedUser.id);
})

test.only('Não foi possível deletar o usuário', async function(){
    const data = dataUser()
    const responseSaveUser = await request('users','post', data); 
    const savedUser = responseSaveUser.data;

    const token = await makeLoginAndReturnToken(data)

    const responseDeleteOneUser = await requestWithToken(`users/${savedUser.id}`, 'delete',{},token)
    const oneUser = responseDeleteOneUser.data;
    console.log(oneUser)
    expect(oneUser.excluido).toBe('1')
})

test('Buscar usuário por email', async function (){
    const data = dataUser()
    const responseSaveUser = await request('users','post', data); 
    const savedUser = responseSaveUser.data;

    const token = await makeLoginAndReturnToken(data)
    // console.log(token)
    // const oneUser = await userService.getUserByEmail(savedUser.email);
    const responseGetUserByEmail = await requestWithToken(`users/mail/${savedUser.email}`,'get', {}, token)
    const oneUser = responseGetUserByEmail.data;

    expect(oneUser.id).toBe(savedUser.id);
    expect(oneUser.nome).toBe(savedUser.nome);
    expect(oneUser.email).toBe(savedUser.email);
    await userService.deleteUser(savedUser.id);
})
