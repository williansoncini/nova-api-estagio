const database = require('../infra/database');

exports.getUsers = function () {
    return database.query('SELECT * FROM USUARIO');
};

exports.saveUser = function(user){
    return database.one('insert into usuario (nome, email, ativo, senha, departamento_id) values ($1, $2, $3, $4, $5) returning *',[
        user.nome,
        user.email,
        user.ativo,
        user.senha,
        user.departamento_id
    ]);
};

exports.deleteUser = function(id){
    return database.none('delete from usuario where id = $1', [id]);
};

exports.getUser = function(id){
    return database.oneOrNone('select * from usuario where id = $1',[id]);
}

exports.updateUser = function(id, data){
    return database.none("update usuario set nome=$1,email=$2,ativo=$3,senha=$4,departamento_id=$5 where usuario.id=$6",[
        data.nome,
        data.email,
        data.ativo,
        data.senha,
        data.departamento_id,
        id])
}

exports.getUserByEmail = function(email){
    // console.log('email na database: ', email)
    // return database.oneOrNone("select * from usuario where email='teste@teste.com'");
    return database.oneOrNone('select * from usuario where email = $1',[email]);
}

