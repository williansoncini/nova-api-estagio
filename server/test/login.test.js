const axios = require('axios');
const crypto = require('crypto');
const userService = require('../service/userService');
const loginService = require('../service/loginService')

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

test.only('Nao foi possivel logar', async function (){
    const data = dataUser();
    const savedUser = await request('http://localhost:3000/users','post', data); 
    const newUser = savedUser.data;
    let response = await axios.post('http://localhost:3000/login',{},{
        auth:{
            username: newUser.email,
            password: data.senha
        }
    });
    response = response.data;
    const token = response.token

    expect(token.length).not.toBe(0)
})
