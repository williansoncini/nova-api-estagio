const database = require('../../infra/database/database_system')

exports.createColumn = async function(tableId, column){
    
    return database.one('insert into coluna(nome, vazio, tipo_coluna, id_tabela) values ($1,$2,$3,$4) returning *',[
        column.nome,
        column.vazio,
        column.tipo_coluna,
        tableId
    ]);
}

exports.getAllColumns = async function(){
    return database.query('select * from coluna');
}

exports.getColumnById = async function(id){
    return database.one('select * from coluna where id = $1',[id]);
}

exports.getColumnByIdTable = async function(id){
    return database.query('select * from coluna where id_tabela = $1',[id]);
}

exports.alterColumn = async function(id,data){
    return database.one('update coluna set(nome,vazio,id_tipocoluna,id_tabela)=($1,$2,$3,$4) where id=$5 returning *', [
        data.nome,
        data.vazio,
        data.id_tipocoluna,
        data.id_tabela,
        id
    ])
}

exports.deleteColumn = async function(id){
    return database.oneOrNone("update coluna set excluido='1' where id=$1 returning *" , [id]);
}

exports.saveColumnsInDataSystem = async function(table){
    
}