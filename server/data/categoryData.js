const database = require('../infra/database');

exports.getcategorys = function () {
    return database.query('SELECT * FROM CATEGORIA');
};

exports.savecategory = function(category){
    return database.one('insert into categoria (descricao, ativa) values ($1, $2) returning *',[
        category.descricao,
        category.ativa
    ]);
};

exports.deletecategory = function(id){
    return database.none("update categoria set excluido='1' where id = $1", [id]);
};

exports.getcategory = function(id){
    return database.oneOrNone('select * from categoria where id = $1',[id]);
}

exports.updatecategory = function(id, data){
    return database.none("update categoria set(descricao,ativo) = ($1,$2) where categoria.id=$3",[
        category.descricao,
        category.ativa,
        id])
}
