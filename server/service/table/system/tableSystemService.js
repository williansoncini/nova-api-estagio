const tableDataSystem = require('../../../data/table/system/tableDataSystem');
const columnsService = require('../columnService')

exports.saveTable = async function(table){
    const tableName = table.nome
    let existsTable = {}
    try {
        existsTable = await tableDataSystem.getTableByNameOrNull(tableName)
    } catch (error) {
        console.log(error)
        return {'status':400,'error':'Não foi possível consultar a tabela no banco de dados'}
    }
    if(existsTable == null){
        try {
            table.ativa = '1'
            await tableDataSystem.saveTable(table)
            return {'status':200,'success':`A tabela ${tableName} foi salva com successo!`}
        } catch (error) {
            console.log(error)
            return {'status':400,'success':`Falha ao salvar a tabela '${tableName}'!`}
        }
    }
    else
        return {'status':400,'error':`Falha ao cadastrar! A tabela '${tableName}' já existe!`}
}

exports.findTableById = async function(id){
    let existsTable = {}
    try {
        existsTable = await tableDataSystem.findTableById(id)
    } catch (error) {
        console.log(error)
        return {'status':400,'error':'Não foi possível encontrar a tabela no banco de dados'}
    }
    if(existsTable != null){    
        return {'status':200,'success':'Tabela encontrada!', 'table':existsTable.nome}
    }
}

exports.deleteTable = async function(id){
    let existsTable = {}
    try {
        existsTable = await tableDataSystem.findTableById(id)
    } catch (error) {
        console.log(error)
        return {'status':400,'error':'Não foi possível consultar a tabela no banco de dados'}
    }
    if(existsTable != null){
        try {
            await tableDataSystem.deleteTable(id); 
            return {'status':200,'success':`A tabela '${existsTable.nome}' foi deletada com successo!`, 'tableName':existsTable.nome}
        } catch (error) {
            console.log(error)
            return {'status':400,'error':`A tabela '${existsTable.nome}' não pode ser deletada`}
        }
    }
    return {'status':400,'error':`A tabela não pode ser encontrada!`}
}

exports.alterTable = async function(id, data){
    let table = {}
    try {
        table = await tableDataSystem.findTableById(id)
    } catch (error) {
        return {'status':400,'error':'Erro ao procurar a tabela!'}        
    }
    const oldName = table.nome
    const newName = data.nome
    // if (oldName != newName){
    try {
        tableDataSystem.alterTable(id,data)
        return{'status':200,'success':'Tabela alterada com successo!','oldTableName': oldName}
    } catch (error) {
        console.log(error)
        return{'status':400,'error':'Erro ao alterar a tabela no sistema'}
    }
    // }
}

exports.geTables = async function(){
    try {
        const tables = await tableDataSystem.getTables();
        return {'status':200,'success':'Tabelas consultadas com successo!', 'tables':tables}
    } catch (error) {
        console.log(error)
        return {'status':400,'error':'Não foi possível coletar todas as tabelas'}
    }
}