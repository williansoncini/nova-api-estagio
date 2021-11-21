const database = require('../../infra/database/database_system');

exports.getcategorys = function () {
    return database.query('SELECT * FROM get_categorys');
};

exports.savecategory = function(category){
    return database.one('insert into categoria (descricao) values ($1) returning *',[
        category.descricao
    ]);
};

exports.deletecategory = function(id){
    return database.oneOrNone("delete from categoria where id=$1;" , [id]);
};

exports.getcategory = function(id){
    return database.oneOrNone('select * from get_categorys where id = $1',[id]);
}

exports.updatecategory = function(id, category){
    return database.none("update categoria set(descricao,ativa) = ($1,$2) where categoria.id=$3",[
        category.descricao,
        category.ativa,
        id])
}

exports.getCategoryByDescrciption = function (description){
    return database.oneOrNone(`select * from categoria where descricao = '${description}'`)
}