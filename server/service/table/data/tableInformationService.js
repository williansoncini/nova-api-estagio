const tableDataInformation = require('../../../data/table/data/tableDataInformation');

exports.createTable = async function(table){
    //Validar se a tabela já existe
    //Caso não exista criar a tabela
    let existsTable = {}
    try {
        existsTable = await getTableByNameOrNull(table.name)
    } catch (error) {
        return {'error':'Falha ao consultar tabela no banco de dados de informações'}
    }
    if (existsTable == null){
        const statment = makeStatementCreateTable(table)
    }

}

exports.alterTableName = async function(newName, oldName){
    if (oldName != newName){
        let oldTable = {}
        try {
            oldTable = await getTableByNameOrNull(oldName)
        } catch (error) {
            return {'error':'Falha ao consultar tabela no banco de dados de informações'}
        }
        if (oldTable != null){
            try {
                tableDataInformation.alterNameTable(oldName, newName)
            } catch (error) {
                return {"erorr":'Falha ao alterar o nome da tablea no banco de dados de informações'}
            }
        }
    }
}

const getTableByNameOrNull = async function(name){
    return await tableDataInformation.findTableBynameInDataDb(name)
}

const makeStatementCreateTable = function (table){
    const columns = table.columns
    let statement = `CREATE TABLE ${table.nome} (`
    columnsLength = columns.length
    for(let i=0; i < columnsLength; i++){
        if (i < columnsLength-1)
            statement += columns[i].nome + ' ' + columns[i].tipo_coluna + ','
        else
            statement += columns[i].nome + ' ' + columns[i].tipo_coluna
    }
    statement += ');'

    return statement
}