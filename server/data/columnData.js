const database = require('../infra/database')

exports.createColumn = async function(data){
    
    return database.one('insert into coluna(nome, vazio, id_tipocoluna, id_tabela) values ($1,$2,$3,$4) returning *',[
        data.nome,
        data.vazio,
        data.id_tipocoluna,
        data.id_tabela
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
    return database.none('delete from coluna where id = $1',[id])
}