const database = require('../../infra/database/database_system');

exports.gettypeColumns = function () {
    return database.query('select * from tipo_coluna');
};

exports.savetypeColumn = function(typeColumn){
    return database.one('insert into tipo_coluna (descricao) values ($1) returning *',[
        typeColumn.descricao
    ]);
};

exports.deletetypeColumn = function(id){
    return database.oneOrNone("delete from tipo_coluna where id=$1 returning *" , [id]);
};

exports.gettypeColumn = function(id){
    return database.oneOrNone('select * from tipo_coluna where id = $1',[id]);
}

exports.updatetypeColumn = function(id, data){
    return database.none("update tipo_coluna set(descricao) = ($1) where tipo_coluna.id=$2",[
        typeColumn.descricao,
        id])
}
