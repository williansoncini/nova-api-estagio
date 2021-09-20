const {generateRandomString} = require('../infra/crypto')
const {request, requestWithToken, requestBasicLogin} = require('../infra/axios')
const tableService = require('../service/tableService');

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
        departamento_id:1
    };
}

const dataTable = function(){
    return {
        nome:generateRandomString(),
        ativa: '1',
        categoria_id:1
    };
}

test("Cadastro de tabela", async function(){
    const dataForUser = dataUser()
    await request('users','post', dataForUser); 

    const token = await makeLoginAndReturnToken(dataForUser)

    const dataForTable = dataTable();
    const response = await requestWithToken('tables','post',dataForTable, token);
    const newTable = response.data;
    const responseGetTable = await requestWithToken(`tables/${newTable.id}`,'get',{},token);
    const getTable = responseGetTable.data;
    // const getTable = await tableService.findTableById(newTable.id);
    expect(newTable.id).toBe(getTable.id);
    expect(newTable.nome).toBe(getTable.nome);
    await requestWithToken(`tables/${newTable.id}`,'delete',{},token);
});

test("Alteração de tabela", async function(){
    const dataForUser = dataUser()
    await request('users','post', dataForUser); 

    const token = await makeLoginAndReturnToken(dataForUser)

    const dataForTable = dataTable();
    const response = await requestWithToken('tables','post',dataForTable, token);
    const newTable = response.data;

    const newData = dataTable();
    const responseAlterTable = await requestWithToken(`tables/${newTable.id}`,'put', newData, token);
    const alterTable = responseAlterTable.data;
    expect(alterTable.nome).toBe(newData.nome);
    await requestWithToken(`tables/${newTable.id}`,'delete',{},token);
});

test("Apagar tabela", async function(){
    const dataForUser = dataUser()
    await request('users','post', dataForUser); 

    const token = await makeLoginAndReturnToken(dataForUser)

    const dataForTable = dataTable();
    const response = await requestWithToken('tables','post',dataForTable, token);
    const newTable = response.data;

    await requestWithToken(`tables/${newTable.id}`,'delete',{},token);
    
    const responseGetTable = await requestWithToken(`tables/${newTable.id}`,'get',{},token);
    const getTable = responseGetTable.data;

    expect(getTable).toBe(null);
});

test("Pegar apenas uma tabela", async function(){
    const dataForUser = dataUser()
    await request('users','post', dataForUser); 

    const token = await makeLoginAndReturnToken(dataForUser)

    const dataForTable = dataTable();
    const response = await requestWithToken('tables','post',dataForTable, token);
    const newTable = response.data;

    const responseGetTable = await requestWithToken(`tables/${newTable.id}`,'get',{},token);
    const getTable = responseGetTable.data;
    expect(getTable.id).toBe(newTable.id);
    expect(getTable.nome).toBe(newTable.nome);
    await requestWithToken(`tables/${newTable.id}`,'delete',{},token);
})

test("Pegar várias tabelas", async function(){
    const dataForUser = dataUser()
    await request('users','post', dataForUser); 

    const token = await makeLoginAndReturnToken(dataForUser)

    const dataForTable = dataTable();
    const response = await requestWithToken('tables','post',dataForTable, token);
    const newTable = response.data;

    const responseGetTables = await requestWithToken('tables','get',{},token);
    const tables = responseGetTables.data;
    const lenght = tables.lenght;
    expect(lenght).not.toBe(0);
    await requestWithToken(`tables/${newTable.id}`,'delete',{},token);
})

