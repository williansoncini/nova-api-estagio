const database = require('../../infra/database/database_system');

exports.getUsers = function () {
    return database.query(`select * from get_users`);
};

exports.saveUser = function(user){
    return database.one('insert into usuario (nome,email,senha,departamento_id, tipo_acesso_id) values ($1,$2,$3,$4,$5) returning *',[
        user.nome,
        user.email,
        user.senha,
        user.departamento_id,
        user.tipo_acesso_id
    ]);
};

exports.deleteUser = function(id){
    return database.oneOrNone("delete from usuario where id=$1 returning *" , [id]);
};

exports.getUser = function(id){
    return database.oneOrNone(`select * from get_users where id='${id}'`);
}

exports.updateUserWithOutPass = function(id,data){
    return database.oneOrNone("update usuario set(nome,email,ativo,departamento_id,tipo_acesso_id)=($1,$2,$3,$4,$5) where id=$6 returning *",[
        data.nome,
        data.email,
        data.ativo,
        data.departamento_id,
        data.tipo_acesso_id,
        id])
}

exports.updateUserWithPass = function(id,data){
    return database.oneOrNone("update usuario set(nome,email,ativo,senha,departamento_id,tipo_acesso_id)=($1,$2,$3,$4,$5,$6) where id=$7 returning *",[
        data.nome,
        data.email,
        data.ativo,
        data.senha,
        data.departamento_id,
        data.tipo_acesso_id,
        id])
}

exports.getUserByEmail = function(email){
    return database.oneOrNone(`select * from usuario where email='${email}';`);
}

exports.getUserByName = function(name){
    return database.oneOrNone(`select * from usuario where nome='${name}';`);
}