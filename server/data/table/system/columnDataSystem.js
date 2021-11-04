const database = require('../../../infra/database/database_system')

exports.createColumn = function(tabela_id, column){
    return database.one('insert into coluna(nome, vazio, tipo_coluna_id, tabela_id) values ($1,$2,$3,$4) returning *',[
        column.nome,
        column.vazio,
        column.tipo_coluna_id,
        tabela_id
    ]);
}

exports.getAllColumns = async function(){
    return database.query('select * from get_columns;');
}

exports.getColumnById = async function(id){
    return database.oneOrNone('select * from get_columns where id = $1;',[id]);
}

exports.getColumnByIdTable = async function(id){
    return database.query('select * from get_columns where tabela_id = $1;',[id]);
}

exports.alterColumn = async function(data){
    return database.query('update coluna set(nome,vazio,tipo_coluna_id)=($1,$2,$3) where id=$4;', [
        data.nome,
        data.vazio,
        data.tipo_coluna_id,
        data.id
    ])
}

exports.deleteColumn = async function(id){
    return database.query("delete from coluna where id=$1;" , [id]);
}

exports.saveColumnsInDataSystem = async function(table){
    
}

