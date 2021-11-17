const databaseSystem = require('../../../infra/database/database_system')

exports.saveTable = function (table){
    return databaseSystem.one('insert into tabela (nome, categoria_id) values ($1,$2) returning *', [table.nome, table.categoria_id]);
}

exports.findTableById = function(id){
    return databaseSystem.oneOrNone('select * from get_tables where id = $1',[id]);
}

exports.deleteTable = function(id){
    return databaseSystem.query("delete from tabela where id=$1",[id]);
}

exports.alterTable = function(id, data){
    return databaseSystem.query('update tabela set(nome,ativa,categoria_id)=($1,$2,$3) where id=$4',[data.nome,data.ativa,data.categoria_id,id]);
}

exports.getTables = function(){
    return databaseSystem.query("select * from get_tables");
}

exports.getTableByNameOrNull = function (tableName){
    return databaseSystem.oneOrNone(`select * from get_tables where nome='${tableName}'`)
}

