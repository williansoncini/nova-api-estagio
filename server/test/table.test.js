const { generateDataTable,generateDataUser } = require('./datas')
const {makeLoginAndReturnToken,createUser,getAllAny,getAnyById,updateAny,deleteAny, createAny}  = require('./actions/generalActions');
const { requestWithToken } = require('../infra/axios');

test("Cadastro de tabela", async function(){
    const dataUser = generateDataUser()
    const newUser = await createUser(dataUser);

    const token = await makeLoginAndReturnToken(dataUser)

    const dataTable = generateDataTable()
    const newTable = await createAny('tables',dataTable,token)
    expect(newTable.nome).toBe(dataTable.nome)
    expect(newTable.ativa).toBe(dataTable.ativa)
    
    const deletedTable = await deleteAny('tables',newTable.id,token)
    expect(deletedTable.excluido).toBe('1')

    const deletedUser = await deleteAny('users',newUser.id,token)
    expect(deletedUser.excluido).toBe('1')
});

test("Alteração de tabela", async function(){
    const dataUser = generateDataUser()
    const newUser = await createUser(dataUser);

    const token = await makeLoginAndReturnToken(dataUser)

    const dataTable = generateDataTable()
    const newTable = await createAny('tables',dataTable,token)

    const newDataTable = generateDataTable()
    const updatedTable = await updateAny('tables',newDataTable,newTable.id,token)
    expect(updatedTable.nome).toBe(updatedTable.nome)
    expect(updatedTable.ativa).toBe(updatedTable.ativa)

    const deletedTable = await deleteAny('tables',newTable.id,token)
    expect(deletedTable.excluido).toBe('1')

    const deletedUser = await deleteAny('users',newUser.id,token)
    expect(deletedUser.excluido).toBe('1')
});

test("Apagar tabela", async function(){
    const dataUser = generateDataUser()
    const newUser = await createUser(dataUser);

    const token = await makeLoginAndReturnToken(dataUser)

    const dataTable = generateDataTable()
    const newTable = await createAny('tables',dataTable,token)

    const deletedTable = await deleteAny('tables',newTable.id,token)
    expect(deletedTable.excluido).toBe('1')

    const deletedUser = await deleteAny('users',newUser.id,token)
    expect(deletedUser.excluido).toBe('1')
});

test("Pegar apenas uma tabela", async function(){
    const dataUser = generateDataUser()
    const newUser = await createUser(dataUser);

    const token = await makeLoginAndReturnToken(dataUser)

    const dataTable = generateDataTable()
    const newTable = await createAny('tables',dataTable,token)

    const oneTable = await getAnyById('tables',newTable.id,token)
    expect(oneTable.nome).toBe(newTable.nome)

    const deletedTable = await deleteAny('tables',newTable.id,token)
    expect(deletedTable.excluido).toBe('1')

    const deletedUser = await deleteAny('users',newUser.id,token)
    expect(deletedUser.excluido).toBe('1')
})

test("Pegar várias tabelas", async function(){
    const dataUser = generateDataUser()
    const newUser = await createUser(dataUser);

    const token = await makeLoginAndReturnToken(dataUser)

    const dataTable = generateDataTable()
    const newTable = await createAny('tables',dataTable,token)

    const tables = await getAllAny('tables',token)
    expect(tables.length).not.toBe(0)

    const deletedTable = await deleteAny('tables',newTable.id,token)
    expect(deletedTable.excluido).toBe('1')

    const deletedUser = await deleteAny('users',newUser.id,token)
    expect(deletedUser.excluido).toBe('1')
})

