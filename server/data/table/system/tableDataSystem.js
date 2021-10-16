const database = require('../../infra/database/database_system')
const databaseData = require('../../infra/database/database_datas')

exports.saveTable = function (table){
    return database.one('insert into tabela (nome, ativa, categoria_id) values ($1,$2,$3) returning *', [table.nome, table.ativa, table.categoria_id]);
}

exports.findTableById = function(id){
    return database.oneOrNone('select * from tabela where id = $1',[id]);
}

exports.deleteTable = function(id){
    return database.oneOrNone("update tabela set excluido='1' where id=$1 returning *" , [id]);
}

exports.alterTable = function(id, data){
    return database.one('update tabela set(nome,ativa,categoria_id)=($1,$2,$3) where id=$4 returning *',[data.nome,data.ativa,data.categoria_id,id]);
}

exports.getTables = function(){
    return database.query('select * from tabela');
}

exports.createTableInDataDbData = function(table){
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
    // console.log(statement)
    databaseData.query(statement)
}

exports.checkIfExistsDatabaseInDbData = function(table){
    // console.log(`SELECT tablename FROM pg_tables where tablename='${table}'`)
    return databaseData.oneOrNone('SELECT tablename FROM pg_tables where tablename=($1)',[table.nome])
    // return databaseData.oneOrNone(`SELECT tablename FROM pg_tables where tablename='${table}'`)
}

exports.getTableByName = function(table){
    return database.oneOrNone('select nome from tabela where nome=($1)',[table.nome])
}

exports.alterTableInDataDb = function(oldName, newName){
    console.log(oldName, newName)
    return databaseData.query(`ALTER TABLE ${String(oldName)} RENAME TO ${String(newName)};`)
    // return databaseData.query("ALTER TABLE $1 RENAME TO $2;",[oldName,newName])
}

exports.deleteTableInDataDb = function(tableName){
    return databaseData.query('DROP TABLE $1 CASCADE;',[tableName])
}

exports.findTableBynameInDataDb = function(tableName){
    return databaseData.oneOrNone("SELECT table_name FROM information_schema.tables where table_schema='public' and table_name=$1",[tableName])
}

exports.findTableBynameInSystemDb = function(tableName){
    return database.oneOrNone(`SELECT NOME FROM TABELA WHERE NOME='${String(tableName)}';`)
}