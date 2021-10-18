const tableDataSystem = require('../../../data/table/system/tableDataSystem');
const columnsService = require('../columnService')

exports.saveTable = async function(table){
    const tableName = table.nome
    let existsTable = {}
    try {
        existsTable = await tableDataSystem.getTableByNameOrNull(tableName)
    } catch (error) {
        return {'status':400,'error':'Não foi possível consultar a tabela no banco de dados'}
    }
    if(existsTable == null){
        try {
            table.ativa = '1'
            await tableDataSystem.saveTable(table)
            return {'status':200,'sucess':`A tabela ${tableName} foi salva com sucesso!`}
        } catch (error) {
            return {'status':400,'sucess':`Falha ao salvar a tabela '${tableName}'!`}
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
        return {'status':400,'error':'Não foi possível encontrar a tabela no banco de dados'}
    }
    if(existsTable != null){    
        return {'status':200,'sucess':'Tabela encontrada!', 'table':existsTable.nome}
    }
}

exports.deleteTable = async function(id){
    let existsTable = {}
    try {
        existsTable = await tableDataSystem.findTableById(id)
    } catch (error) {
        return {'status':400,'error':'Não foi possível consultar a tabela no banco de dados'}
    }
    if(existsTable != null){
        try {
            await tableDataSystem.deleteTable(id); 
            return {'status':200,'sucess':`A tabela '${existsTable.nome}' foi deletada com sucesso!`, 'tableName':existsTable.nome}
        } catch (error) {
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
        return{'status':200,'sucess':'Tabela alterada com sucesso!','oldTableName': oldName}
    } catch (error) {
        return{'status':400,'error':'Erro ao alterar a tabela no sistema'}
    }
    // }
}

exports.getActiveTables = async function(){
    try {
        const tables = await tableDataSystem.getActiveTables();
        return {'status':200,'sucess':'Tabelas consultadas com sucesso!', 'tables':tables}
    } catch (error) {
        return {'status':400,'error':'Não foi possível coletar todas as tabelas'}
    }
}