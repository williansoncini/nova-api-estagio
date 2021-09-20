const {requestWithToken} = require('../infra/axios')
const {generateDataUser, generateDataColumn, generateDataCategory, generateDataTable, generateTypeColumn} = require('./datas')
const {makeLoginAndReturnToken, createUser} = require('./actions/userActions')
const {createTable} = require('./actions/tableActions')
const {createCategory} = require('./actions/categoryActions')
const {createTypeColumn} = require('./actions/typeColumnActions')
const { createColumn } = require('./actions/columnActions')

test('Criar coluna', async function(){
    const dataUser = generateDataUser()
    const newUser = await createUser(dataUser);

    const token = await makeLoginAndReturnToken(dataUser)
    const newCategory = await createCategory(generateDataCategory(),token)

    const dataTable = generateDataTable()
    dataTable.categoria_id = newCategory.id
    const newTable = await createTable(dataTable,token)

    const newTypeColumn = await createTypeColumn(generateTypeColumn(), token)

    const dataColumn = generateDataColumn();
    dataColumn.id_tabela = newTable.id
    dataColumn.id_tipocoluna = newTypeColumn.id
    const newColumn = await createColumn(dataColumn, token)

    await requestWithToken(`users/${newUser.id}`,'delete',{},token);
    await requestWithToken(`columns/${newColumn.id}`,'delete',{},token);
    await requestWithToken(`typeColumns/${newTypeColumn.id}`,'delete',{},token);
    await requestWithToken(`tables/${newTable.id}`,'delete',{},token);
    await requestWithToken(`categorys/${newCategory.id}`,'delete',{},token);
})