const { generateDataDepartament,generateDataUser } = require('./datas')
const {makeLoginAndReturnToken,createUser,getAllAny,getAnyById,updateAny,deleteAny, createAny}  = require('./actions/generalActions');
const { requestWithToken } = require('../infra/axios');

test("Cadastro de departamento", async function(){
    const dataUser = generateDataUser()
    const newUser = await createUser(dataUser);

    const token = await makeLoginAndReturnToken(dataUser)

    const dataDepartament = generateDataDepartament()
    const newDepartament = await createAny('departaments',dataDepartament,token)
    expect(newDepartament.descricao).toBe(dataDepartament.descricao)
    expect(newDepartament.ativo).toBe(dataDepartament.ativo)
    
    const deletedDepartament = await deleteAny('departaments',newDepartament.id,token)
    expect(deletedDepartament.excluido).toBe('1')

    const deletedUser = await deleteAny('users',newUser.id,token)
    expect(deletedUser.excluido).toBe('1')
});

test("Alteração de departamento", async function(){
    const dataUser = generateDataUser()
    const newUser = await createUser(dataUser);

    const token = await makeLoginAndReturnToken(dataUser)

    const dataDepartament = generateDataDepartament()
    const newDepartament = await createAny('departaments',dataDepartament,token)

    const newDepartamentData = generateDataDepartament()
    const updatedDepartament = await updateAny('departaments',newDepartamentData,newDepartament.id,token)
    expect(updatedDepartament.descricao).toBe(updatedDepartament.descricao)
    expect(updatedDepartament.ativo).toBe(updatedDepartament.ativo)

    const deletedDepartament = await deleteAny('departaments',newDepartament.id,token)
    expect(deletedDepartament.excluido).toBe('1')

    const deletedUser = await deleteAny('users',newUser.id,token)
    expect(deletedUser.excluido).toBe('1')
});

test("Apagar departamento", async function(){
    const dataUser = generateDataUser()
    const newUser = await createUser(dataUser);

    const token = await makeLoginAndReturnToken(dataUser)

    const dataDepartament = generateDataDepartament()
    const newDepartament = await createAny('departaments',dataDepartament,token)

    const deletedDepartament = await deleteAny('departaments',newDepartament.id,token)
    expect(deletedDepartament.excluido).toBe('1')

    const deletedUser = await deleteAny('users',newUser.id,token)
    expect(deletedUser.excluido).toBe('1')
});

test("Pegar apenas um departamento", async function(){
    const dataUser = generateDataUser()
    const newUser = await createUser(dataUser);

    const token = await makeLoginAndReturnToken(dataUser)

    const dataDepartament = generateDataDepartament()
    const newDepartament = await createAny('departaments',dataDepartament,token)

    const oneDepartament = await getAnyById('departaments',newDepartament.id,token)
    expect(oneDepartament.descricao).toBe(newDepartament.descricao)

    const deletedDepartament = await deleteAny('departaments',newDepartament.id,token)
    expect(deletedDepartament.excluido).toBe('1')

    const deletedUser = await deleteAny('users',newUser.id,token)
    expect(deletedUser.excluido).toBe('1')
})

test("Pegar vários departamentos", async function(){
    const dataUser = generateDataUser()
    const newUser = await createUser(dataUser);

    const token = await makeLoginAndReturnToken(dataUser)

    const dataDepartament = generateDataDepartament()
    const newDepartament = await createAny('departaments',dataDepartament,token)

    const departaments = await getAllAny('departaments',token)
    expect(departaments.length).not.toBe(0)

    const deletedDepartament = await deleteAny('departaments',newDepartament.id,token)
    expect(deletedDepartament.excluido).toBe('1')

    const deletedUser = await deleteAny('users',newUser.id,token)
    expect(deletedUser.excluido).toBe('1')
})

