const axios = require('axios');
const crypto = require('crypto');
const tableService = require('../service/tableService');

const request = function(url, method, data){
    return axios({url,method, data});
}

const generate = function(){
    return crypto.randomBytes(20).toString('hex');
}

const dataTable = function(){
    return {
        nome:generate(),
        ativa: '1',
        categoria_id:1
    };
}

test("Cadastro de tabela", async function(){
    const data = dataTable();
    const response = await request('http://localhost:3000/table','post',data);
    const newTable = response.data;
    const responseGetTable = await request(`http://localhost:3000/table/${newTable.id}`,'get');
    const getTable = responseGetTable.data;
    // const getTable = await tableService.findTableById(newTable.id);
    expect(newTable.id).toBe(getTable.id);
    expect(newTable.nome).toBe(getTable.nome);
    await request(`http://localhost:3000/table/${newTable.id}`,'delete');
});

test("Alteração de tabela", async function(){
    const responseNewTable = await request('http://localhost:3000/table','post',dataTable());
    const newTable = responseNewTable.data;

    const newData = dataTable();
    const responseAlterTable = await request(`http://localhost:3000/table/${newTable.id}`,'put', newData);
    const alterTable = responseAlterTable.data;
    expect(alterTable.nome).toBe(newData.nome);
    await request(`http://localhost:3000/table/${newTable.id}`,'delete');
});

test("Apagar tabela", async function(){
    const responseNewTable = await request('http://localhost:3000/table','post',dataTable());
    const newTable = responseNewTable.data;
    await request(`http://localhost:3000/table/${newTable.id}`,'delete');
    
    const responseGetTable = await request(`http://localhost:3000/table/${newTable.id}`,'get');
    const getTable = responseGetTable.data;

    expect(getTable).toBe(null);
});

test("Pegar apenas uma tabela", async function(){
    const responseNewTable = await request('http://localhost:3000/table','post',dataTable());
    const newTable = responseNewTable.data;
    const responseGetTable = await request(`http://localhost:3000/table/${newTable.id}`,'get');
    const getTable = responseGetTable.data;
    expect(getTable.id).toBe(newTable.id);
    expect(getTable.nome).toBe(newTable.nome);
    await request(`http://localhost:3000/table/${newTable.id}`,'delete');
})

test("Pegar apenas uma tabela", async function(){
    const responseNewTable = await request('http://localhost:3000/table','post',dataTable());
    const newTable = responseNewTable.data;
    const responseGetTables = await request('http://localhost:3000/table','get');
    const tables = responseGetTables.data;
    const lenght = tables.lenght;
    expect(lenght).not.toBe(0);
    await request(`http://localhost:3000/table/${newTable.id}`,'delete');
})