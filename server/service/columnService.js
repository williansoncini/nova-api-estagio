const columnData = require('../data/columnData');

exports.createColumn = async function(data){
    return await columnData.createColumn(data);
}

exports.getAllColumns = async function(){
    return await columnData.getAllColumns();
}

exports.getColumnById = async function(id){
    return await columnData.getColumnById(id);
}

exports.getColumnByIdTable = async function(id){
    return await columnData.getColumnByIdTable(id);
}

exports.alterColumn = async function(id, data){
    return await columnData.alterColumn(id, data);
}