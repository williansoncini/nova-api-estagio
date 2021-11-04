const databaseInformation = require('../../../infra/database/database_information')

exports.getTableNameFromName = function(tableName){
    return databaseInformation.oneOrNone(`SELECT tablename FROM pg_tables where tablename='${tableName}'`)
    // return databaseInformation.query(`SELECT column_name as nome, udt_name as tipo_coluna FROM information_schema.columns where table_schema='public' and table_name='${tableName}'`)
}

exports.alterNameTable = function(oldName, newName){
    return databaseInformation.query(`ALTER TABLE ${String(oldName)} RENAME TO ${String(newName)};`)   
}

exports.createTable = function(table){
    return databaseInformation.query(`CREATE TABLE ${table.nome} ();`)
}

const makeStatementCreateTable = function (table){
    const columns = table.colunas
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

exports.deleteTable = function(tableName){
    return databaseInformation.query(`DROP TABLE IF EXISTS ${tableName} CASCADE;`)
}

exports.findTableAndColumnsFromTableName = function(tableName){
    return databaseInformation.query(`SELECT column_name as nome, udt_name as tipo_coluna FROM information_schema.columns where table_schema='public' and table_name='${tableName}'`)
}


exports.getTablesAndColumns = function(){
    return databaseInformation.query("SELECT table_name as table,column_name as nome,udt_name as tipo_coluna from information_schema.columns where table_schema='public' order by 1, ordinal_position")
}