const database = require('../../infra/database/database_system');

exports.getdepartaments = async function () {
    return database.query('SELECT * FROM get_departaments');
};

exports.savedepartament = async function(departament){
    return database.one('insert into departamento (descricao) values ($1) returning *',[
        departament.descricao
    ]);
};

exports.deletedepartament = async function(id){
    return database.oneOrNone("delete from departamento where id=$1 returning *" , [id]);
};

exports.getdepartament = async function(id){
    return database.oneOrNone('select * from get_departaments where id = $1',[id]);
}

exports.updatedepartament = async function(id, data){
    return database.oneOrNone("update departamento set(descricao,ativo)=($1,$2) where id=$3 returning *",[
        data.descricao,
        data.ativo,
        id])
}

exports.getdepartamentByDescription = function (description){
    return database.oneOrNone(`SELECT * FROM DEPARTAMENTO WHERE DESCRICAO = '${description}'`)
}
