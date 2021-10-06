const { generateDataUser } = require('./datas')
const {makeLoginAndReturnToken,createUser,getAllAny,getAnyById,updateAny,deleteAny}  = require('./actions/generalActions');
const { requestWithToken } = require('../infra/axios');

test('Coletar usuários', async function (){
    const dataUser = generateDataUser()
    const newUser = await createUser(dataUser);

    const token = await makeLoginAndReturnToken(dataUser)

    const users = await getAllAny('users',token)
    expect(users.length).not.toBe(0)

    const deletedUser = await deleteAny('users',newUser.id,token)
    expect(deletedUser.excluido).toBe('1')
});

test('Salvar usuário', async function (){
    const dataUser = generateDataUser()
    const newUser = await createUser(dataUser);

    const token = await makeLoginAndReturnToken(dataUser)
    const deletedUser = await deleteAny('users',newUser.id,token)
    expect(deletedUser.excluido).toBe('1')
});

test('Alterar usuário', async function (){
    const dataUser = generateDataUser()
    const newUser = await createUser(dataUser);

    const token = await makeLoginAndReturnToken(dataUser);

    const newDataUser = generateDataUser()
    const updatedUser = await updateAny('users',newDataUser,newUser.id,token)

    expect(updatedUser.nome).toBe(newDataUser.nome)
    expect(updatedUser.email).toBe(newDataUser.email)
    expect(updatedUser.ativo).toBe(newDataUser.ativo)

    const deletedUser = await deleteAny('users',newUser.id,token)
    expect(deletedUser.excluido).toBe('1')
});

test('Não foi possível consultar apenas 1 usuário', async function (){
    const dataUser = generateDataUser()
    const newUser = await createUser(dataUser);

    const token = await makeLoginAndReturnToken(dataUser);

    const oneUser = await getAnyById('users',newUser.id,token)
    expect(oneUser.nome).toBe(newUser.nome)
    expect(oneUser.email).toBe(newUser.email)
    expect(oneUser.ativo).toBe(newUser.ativo)

    const deletedUser = await deleteAny('users',newUser.id,token)
    expect(deletedUser.excluido).toBe('1')
})

test('Não foi possível deletar o usuário', async function(){
    const dataUser = generateDataUser()
    const newUser = await createUser(dataUser);

    const token = await makeLoginAndReturnToken(dataUser);

    const deletedUser = await deleteAny('users',newUser.id,token)
    expect(deletedUser.excluido).toBe('1')
})

test('Buscar usuário por email', async function (){
    const dataUser = generateDataUser()
    const newUser = await createUser(dataUser);

    const token = await makeLoginAndReturnToken(dataUser);

    const responseGetUserByEmail = await requestWithToken(`users/mail/${newUser.email}`,'get', {}, token)
    const oneUser = responseGetUserByEmail.data;

    expect(oneUser.id).toBe(newUser.id);
    expect(oneUser.nome).toBe(newUser.nome);
    expect(oneUser.email).toBe(newUser.email);

    const deletedUser = await deleteAny('users',newUser.id,token)
    expect(deletedUser.excluido).toBe('1')
})
