const database = require('../../infra/database/database_system');

exports.getUsers = function () {
    return database.query('SELECT * FROM USUARIO');
};

exports.saveUser = function(user){
    return database.one('insert into usuario (nome,email,ativo,senha) values ($1,$2,$3,$4) returning *',[
        user.nome,
        user.email,
        user.ativo,
        user.senha
    ]);
};

exports.deleteUser = function(id){
    return database.oneOrNone("update usuario set excluido='1' where id=$1 returning *" , [id]);
};

exports.getUser = function(id){
    return database.oneOrNone('select * from usuario where id = $1',[id]);
}

exports.updateUser = function(id, data){
    return database.oneOrNone("update usuario set(nome,email,ativo,senha,departamento_id)=($1,$2,$3,$4,$5) where id=$6 returning *",[
        data.nome,
        data.email,
        data.ativo,
        data.senha,
        data.departamento_id,
        id])
}

exports.getUserByEmail = function(email){
    return database.oneOrNone(`select * from usuario where email='${email}';`);
}

exports.getUserByName = function(name){
    return database.oneOrNone(`select * from usuario where nome='${name}';`);
}