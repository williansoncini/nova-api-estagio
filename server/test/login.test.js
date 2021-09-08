const axios = require('axios');
const crypto = require('crypto');
const userService = require('../service/userService');

const generate = function(){
    return crypto.randomBytes(20).toString('hex');
}

const request = function(url, method, data){
    return axios({url,method, data});
}

const dataUser = function(){
    return {
        nome:generate(),
        email:generate(),
        ativo: '1',
        senha:generate(),
        departamento_id:1
    };
}

test('Nao foi possivel logar', async function (){
    const data = dataUser();
    const saveUser = await request('http://localhost:3000/users','post', data); 
    const newUser = saveUser.data;
    const message = await request('http://localhost:3000/login','post', data);
    expect(message.data).toBe('Sucesso!');
    await userService.deleteUser(newUser.id);
})
