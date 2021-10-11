const tableData = require('../data/tableData');
const columnsService = require('../service/columnService')

exports.saveTable = async function(table){
    await createTableInDataDb(table)
    let tableReturn = await saveTableInDataSystem(table)
    const columns = await columnsService.saveColumnsInDataSystem(tableReturn.id, table.columns)
    tableReturn.columns = columns
    return tableReturn
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

async function createTableInDataDb(table, columns){
    try {
        checkTableInDb = await tableData.checkIfExistsDatabaseInDbData(table)
        if (checkTableInDb == null){
            await tableData.createTableInDataDbData(table)
            console.log('sucess')
        }
        else{
            console.log('Table already exists')
            return 'Table already exists'
        }
    } catch (error) {
        console.log(error)
    }
}

const saveTableInDataSystem = async function(table){
    try {
        checkIfTableExists = await tableData.getTableByName(table);
        if (checkIfTableExists == null){
            if (table.ativa == null)
                table.ativa = '1' 
                console.log('sucess')
                return await tableData.saveTable(table);
        }
        else{
            console.log('Table already exists')
            return 'Table already exists'
        }
    } catch (error) {
        console.log(error)
    }
}
