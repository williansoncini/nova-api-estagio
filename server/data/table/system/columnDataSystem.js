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
    return database.query('select * from get_columns');
}

exports.getColumnById = async function(id){
    return database.one('select * from get_columns where id = $1',[id]);
}

exports.getColumnByIdTable = async function(id){
    return database.query('select * from get_columns where tabela_id = $1',[id]);
}

exports.alterColumn = async function(id,data){
    return database.one('update coluna set(nome,vazio,id_tipocoluna,tabela_id)=($1,$2,$3,$4) where id=$5 returning *', [
        data.nome,
        data.vazio,
        data.id_tipocoluna,
        data.tabela_id,
        id
    ])
}

exports.deleteColumn = async function(id){
    return database.oneOrNone("delete from coluna where id=$1 returning *" , [id]);
}

exports.saveColumnsInDataSystem = async function(table){
    
}

