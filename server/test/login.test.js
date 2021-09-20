const {generateRandomString} = require('../infra/crypto')
const {requestBasicLogin, request} = require('../infra/axios');
const { generateDataUser } = require('./datas');
const { makeLoginAndReturnToken } = require('./actions/userActions');

const dataUser = function(){
    return {
        nome:generateRandomString(),
        email:generateRandomString(),
        ativo: '1',
        senha:generateRandomString(),
        departamento_id:1
    };
}

test('Nao foi possivel logar', async function (){
    const data = dataUser();
    const responseSaveUser = await request('users','post', data); 
    const newUser = responseSaveUser.data;
    let responseLogin = await requestBasicLogin('login',data);
    responseLoginData = responseLogin.data;
    const token = responseLoginData.token
    expect(token.length).not.toBe(0)
})

test('Logout', async function(){
    const data = generateDataUser()
    const token = makeLoginAndReturnToken(data)

    
})