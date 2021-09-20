const database = require('../infra/database');

exports.gettypeColumns = function () {
    return database.query('select * from tipocoluna');
};

exports.savetypeColumn = function(typeColumn){
    return database.one('insert into tipocoluna (descricao) values ($1) returning *',[
        typeColumn.descricao
    ]);
};

exports.deletetypeColumn = function(id){
    return database.none("update tipocoluna set excluido='1' where id = $1", [id]);
};

exports.gettypeColumn = function(id){
    return database.oneOrNone('select * from tipocoluna where id = $1',[id]);
}

exports.updatetypeColumn = function(id, data){
    return database.none("update tipocoluna set(descricao) = ($1) where tipocoluna.id=$2",[
        typeColumn.descricao,
        id])
}
