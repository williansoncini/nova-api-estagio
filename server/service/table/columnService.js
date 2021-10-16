const columnData = require('../../data/table/columnData');

const createColumn = async function(tableId, column){
    return await columnData.createColumn(tableId, column);
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

exports.deleteColumn = async function(id){
    return await columnData.deleteColumn(id);
}

const saveColumnsInDataSystem = async function(tableId, columns){
    const columnsLength = columns.length
    let returnColumns = []
    for (let i=0; i < columnsLength; i++){
        returnColumns.push(await createColumn(tableId,columns[i]))
    }
    return returnColumns
}

exports.createColumn = createColumn
exports.saveColumnsInDataSystem = saveColumnsInDataSystem