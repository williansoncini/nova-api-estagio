const {requestWithToken} = require('../infra/axios');
const { createUser, createAny, deleteAny, makeLoginAndReturnToken, updateAny, getAllAny, getAnyById } = require('./actions/generalActions');
const {generateDataUser, generateDataColumn, generateDataCategory, generateDataTable, generateTypeColumn} = require('./datas')
// const {makeLoginAndReturnToken, createUser} = require('./actions/userActions')
// const {createTable} = require('./actions/tableActions')
// const {createCategory} = require('./actions/categoryActions')
// const {createTypeColumn} = require('./actions/typeColumnActions')
// const { createColumn } = require('./actions/columnActions')

test('Criar coluna', async function(){
    const dataUser = generateDataUser()
    const newUser = await createUser(dataUser);

    const token = await makeLoginAndReturnToken(dataUser)

    const newCategory = await createAny('categorys',generateDataCategory(),token)

    const dataTable = generateDataTable()
    dataTable.categoria_id = newCategory.id
    const newTable = await createAny('tables',dataTable,token)

    const newTypeColumn = await createAny('typeColumns',generateTypeColumn(), token)

    const dataColumn = generateDataColumn();
    dataColumn.id_tabela = newTable.id
    dataColumn.id_tipocoluna = newTypeColumn.id
    const newColumn = await createAny('columns',dataColumn, token)

    const deletedUser = await deleteAny('users',newUser.id,token)
    const deletedColumn = await deleteAny('columns',newColumn.id,token)
    const deletedTypeColumn = await deleteAny('typeColumns',newTypeColumn.id,token)
    const deletedTables = await deleteAny('tables',newTable.id,token)
    const deletedCategory = await deleteAny('categorys',newCategory.id,token)
    expect(deletedUser.excluido).toBe('1')
    expect(deletedColumn.excluido).toBe('1')
    expect(deletedTypeColumn.excluido).toBe('1')
    expect(deletedTables.excluido).toBe('1')
    expect(deletedCategory.excluido).toBe('1')
})

test('Alterar coluna', async function(){
    const dataUser = generateDataUser()
    const newUser = await createUser(dataUser);

    const token = await makeLoginAndReturnToken(dataUser)

    const newCategory = await createAny('categorys',generateDataCategory(),token)

    const dataTable = generateDataTable()
    dataTable.categoria_id = newCategory.id
    const newTable = await createAny('tables',dataTable,token)

    const newTypeColumn = await createAny('typeColumns',generateTypeColumn(), token)

    const dataColumn = generateDataColumn();
    dataColumn.id_tabela = newTable.id
    dataColumn.id_tipocoluna = newTypeColumn.id
    const newColumn = await createAny('columns',dataColumn, token)

    const newDataColumn = generateDataColumn()
    newDataColumn.id_tabela = newTable.id
    newDataColumn.id_tipocoluna = newTypeColumn.id
    const updatedColumn = await updateAny('columns',newDataColumn,newColumn.id,token)

    expect(updatedColumn.nome).toBe(newDataColumn.nome)

    const deletedUser = await deleteAny('users',newUser.id,token)
    const deletedColumn = await deleteAny('columns',newColumn.id,token)
    const deletedTypeColumn = await deleteAny('typeColumns',newTypeColumn.id,token)
    const deletedTables = await deleteAny('tables',newTable.id,token)
    const deletedCategory = await deleteAny('categorys',newCategory.id,token)
    expect(deletedUser.excluido).toBe('1')
    expect(deletedColumn.excluido).toBe('1')
    expect(deletedTypeColumn.excluido).toBe('1')
    expect(deletedTables.excluido).toBe('1')
    expect(deletedCategory.excluido).toBe('1')
})

test('Pegar todas as colunas', async function(){
    const dataUser = generateDataUser()
    const newUser = await createUser(dataUser);

    const token = await makeLoginAndReturnToken(dataUser)

    const newCategory = await createAny('categorys',generateDataCategory(),token)

    const dataTable = generateDataTable()
    dataTable.categoria_id = newCategory.id
    const newTable = await createAny('tables',dataTable,token)

    const newTypeColumn = await createAny('typeColumns',generateTypeColumn(), token)

    const dataColumn = generateDataColumn();
    dataColumn.id_tabela = newTable.id
    dataColumn.id_tipocoluna = newTypeColumn.id
    const newColumn = await createAny('columns',dataColumn, token)

    const columns = await getAllAny('columns',token)
    expect(columns.length).not.toBe(0)

    const deletedUser = await deleteAny('users',newUser.id,token)
    const deletedColumn = await deleteAny('columns',newColumn.id,token)
    const deletedTypeColumn = await deleteAny('typeColumns',newTypeColumn.id,token)
    const deletedTables = await deleteAny('tables',newTable.id,token)
    const deletedCategory = await deleteAny('categorys',newCategory.id,token)
    expect(deletedUser.excluido).toBe('1')
    expect(deletedColumn.excluido).toBe('1')
    expect(deletedTypeColumn.excluido).toBe('1')
    expect(deletedTables.excluido).toBe('1')
    expect(deletedCategory.excluido).toBe('1')
})

test('Pegar apenas uma coluna', async function(){
    const dataUser = generateDataUser()
    const newUser = await createUser(dataUser);

    const token = await makeLoginAndReturnToken(dataUser)

    const newCategory = await createAny('categorys',generateDataCategory(),token)

    const dataTable = generateDataTable()
    dataTable.categoria_id = newCategory.id
    const newTable = await createAny('tables',dataTable,token)

    const newTypeColumn = await createAny('typeColumns',generateTypeColumn(), token)

    const dataColumn = generateDataColumn();
    dataColumn.id_tabela = newTable.id
    dataColumn.id_tipocoluna = newTypeColumn.id
    const newColumn = await createAny('columns',dataColumn, token)

    const oneColumn = await getAnyById('columns', newColumn.id, token)
    expect(oneColumn.id).toBe(newColumn.id)
    expect(oneColumn.id_tabela).toBe(newColumn.id_tabela)
    expect(oneColumn.nome).toBe(newColumn.nome)
    expect(oneColumn.vazio).toBe(newColumn.vazio)

    const deletedUser = await deleteAny('users',newUser.id,token)
    const deletedColumn = await deleteAny('columns',newColumn.id,token)
    const deletedTypeColumn = await deleteAny('typeColumns',newTypeColumn.id,token)
    const deletedTables = await deleteAny('tables',newTable.id,token)
    const deletedCategory = await deleteAny('categorys',newCategory.id,token)
    expect(deletedUser.excluido).toBe('1')
    expect(deletedColumn.excluido).toBe('1')
    expect(deletedTypeColumn.excluido).toBe('1')
    expect(deletedTables.excluido).toBe('1')
    expect(deletedCategory.excluido).toBe('1')
})

test('Apagar coluna', async function(){
    const dataUser = generateDataUser()
    const newUser = await createUser(dataUser);

    const token = await makeLoginAndReturnToken(dataUser)

    const newCategory = await createAny('categorys',generateDataCategory(),token)

    const dataTable = generateDataTable()
    dataTable.categoria_id = newCategory.id
    const newTable = await createAny('tables',dataTable,token)

    const newTypeColumn = await createAny('typeColumns',generateTypeColumn(), token)

    const dataColumn = generateDataColumn();
    dataColumn.id_tabela = newTable.id
    dataColumn.id_tipocoluna = newTypeColumn.id
    const newColumn = await createAny('columns',dataColumn, token)
    
    const deletedUser = await deleteAny('users',newUser.id,token)
    const deletedColumn = await deleteAny('columns',newColumn.id,token)
    const deletedTypeColumn = await deleteAny('typeColumns',newTypeColumn.id,token)
    const deletedTables = await deleteAny('tables',newTable.id,token)
    const deletedCategory = await deleteAny('categorys',newCategory.id,token)
    expect(deletedUser.excluido).toBe('1')
    expect(deletedColumn.excluido).toBe('1')
    expect(deletedTypeColumn.excluido).toBe('1')
    expect(deletedTables.excluido).toBe('1')
    expect(deletedCategory.excluido).toBe('1')
})