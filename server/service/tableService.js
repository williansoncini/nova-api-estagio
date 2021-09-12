const tableData = require('../data/tableData')

exports.saveTable = async function(data){
    return await tableData.saveTable(data);
}

exports.findTableById = async function(id){
    return await tableData.findTableById(id);
}

exports.deleteTable = async function(id){
    return await tableData.deleteTable(id);
}

exports.alterTable = async function(id, data){
    return await tableData.alterTable(id,data);
}

exports.getTables = async function(){
    return await tableData.getTables();
}