const database = require('../../infra/database/database_system');

exports.getdepartaments = function () {
    return database.query('SELECT * FROM departamento');
};

exports.savedepartament = function(departament){
    return database.one('insert into departamento (descricao,ativo) values ($1,$2) returning *',[
        departament.descricao,
        departament.ativo,
    ]);
};

exports.deletedepartament = function(id){
    return database.oneOrNone("update departamento set excluido='1' where id=$1 returning *" , [id]);
};

exports.getdepartament = function(id){
    return database.oneOrNone('select * from departamento where id = $1',[id]);
}

exports.updatedepartament = function(id, data){
    return database.oneOrNone("update departamento set(descricao,ativo)=($1,$2) where id=$3 returning *",[
        data.descricao,
        data.ativo,
        id])
}
