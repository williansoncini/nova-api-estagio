const {generateRandomString} = require('../infra/crypto')

exports.generateDataUser = function(){
    return {
        nome:generateRandomString(),
        email:generateRandomString(),
        ativo: '1',
        senha:generateRandomString(),
        departamento_id:1
    };
}

exports.generateDataColumn = function(){
    return {
    nome:generateRandomString(),
    vazio:'1',
    id_tipocoluna:0,
    id_tabela:0
    }
}

exports.generateDataTable = function(){
    return {
        nome:generateRandomString(),
        ativa: '1',
        categoria_id:1
    };
}

exports.generateDataCategory = function(){
    return {
        descricao:generateRandomString(),
        ativa: '1',
    };
}

exports.generateTypeColumn = function(){
    return {
        descricao:generateRandomString()
    };
}
