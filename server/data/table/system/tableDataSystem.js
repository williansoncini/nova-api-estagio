const databaseSystem = require('../../../infra/database/database_system')

exports.saveTable = function (table){
    return databaseSystem.one('insert into tabela (nome, ativa, categoria_id) values ($1,$2,$3) returning *', [table.nome, table.ativa, table.categoria_id]);
}

exports.findTableById = function(id){
    return databaseSystem.oneOrNone('select * from tabela where id = $1',[id]);
}

exports.deleteTable = function(id){
    return databaseSystem.query("update tabela set excluido='1' where id=$1",[id]);
}

exports.alterTable = function(id, data){
    return databaseSystem.one('update tabela set(nome,ativa,categoria_id)=($1,$2,$3) where id=$4 returning *',[data.nome,data.ativa,data.categoria_id,id]);
}

exports.getActiveTables = function(){
    return databaseSystem.query("select * from tabela where excluido='0'");
}

exports.getTableByNameOrNull = function (tableName){
    return databaseSystem.oneOrNone(`select * from tabela where nome='${tableName}'`)
}