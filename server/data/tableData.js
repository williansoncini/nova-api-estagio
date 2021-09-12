const database = require('../infra/database')

exports.saveTable = function (data){
    return database.one('insert into tabela (nome, ativa, categoria_id) values ($1,$2,$3) returning *', [data.nome, data.ativa, data.categoria_id]);
}

exports.findTableById = function(id){
    return database.oneOrNone('select * from tabela where id = $1',[id]);
}

exports.deleteTable = function(id){
    return database.none('delete from tabela where id = $1', [id]);
}

exports.alterTable = function(id, data){
    return database.one('update tabela set(nome,ativa,categoria_id)=($1,$2,$3) where id=$4 returning *',[data.nome,data.ativa,data.categoria_id,id]);
}

exports.getTables = function(){
    return database.query('select * from tabela');
}