// const { test } = require("@jest/globals");
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

test('Coletar usuários', async function (){
    const saveUser = await request('http://localhost:3000/users','post', dataUser()); 
    const newUser = saveUser.data;
    const response = await request('http://localhost:3000/users', 'get');
    const length = (response.data).length;
    expect(length).not.toBe(0);
    await userService.deleteUser(newUser.id);
});

test('Salvar usuário', async function (){
    const data = dataUser()
    const response = await request('http://localhost:3000/users','post', data); 
    const user = response.data;
    expect(user.nome).toBe(data.nome);
    expect(user.email).toBe(data.email);
    await userService.deleteUser(user.id);
});

test('Alterar usuário', async function (){
    const responseSave = await request('http://localhost:3000/users','post',dataUser());
    const newUser = responseSave.data;
    newUser.nome = generate();
    newUser.email = generate();
    newUser.senha = generate();
    await request(`http://localhost:3000/users/${newUser.id}`,'put',newUser); 
    const responsePut = await request(`http://localhost:3000/users/${newUser.id}`, 'get')
    const updatedUser = responsePut.data;
    expect(updatedUser.nome).toBe(newUser.nome)
    expect(updatedUser.email).toBe(newUser.email)
    await userService.deleteUser(updatedUser.id);
});

test('Não foi possível consultar apenas 1 usuário', async function (){
    const responseSaveUser = await request('http://localhost:3000/users','post', dataUser()); 
    const savedUser = responseSaveUser.data;
    const responseGetOneUser = await request(`http://localhost:3000/users/${savedUser.id}`, 'get')
    const oneUser = responseGetOneUser.data;
    expect(oneUser.id).toBe(savedUser.id);
    expect(oneUser.nome).toBe(savedUser.nome);
    expect(oneUser.email).toBe(savedUser.email);
    await userService.deleteUser(savedUser.id);
})

test('Não foi possível deletar o usuário', async function(){
    const responseSaveUser = await request('http://localhost:3000/users','post', dataUser()); 
    const savedUser = responseSaveUser.data;
    await request(`http://localhost:3000/users/${savedUser.id}`, 'delete')
    const responseGetOneUser = await request(`http://localhost:3000/users/${savedUser.id}`, 'get')
    const oneUser = responseGetOneUser.data;
    expect(oneUser).toBe(null)
})

test('Buscar usuário por email', async function (){
    const responseSaveUser = await request('http://localhost:3000/users','post', dataUser()); 
    const savedUser = responseSaveUser.data;
    const oneUser = await userService.getUserByEmail(savedUser.email);
    expect(oneUser.id).toBe(savedUser.id);
    expect(oneUser.nome).toBe(savedUser.nome);
    expect(oneUser.email).toBe(savedUser.email);
    await userService.deleteUser(savedUser.id);
})
