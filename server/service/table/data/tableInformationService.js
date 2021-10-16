const tableData = require('../../../data/table/tableData');
const columnsService = require('../columnService')

// exports.saveTable = async function(table){
//     const tableName = table.name
//     const existsTableInDataDb = await tableData.findTableBynameInDataDb(tableName)
//     // console.log(existsTableInDataDb)
//     if (!existsTableInDataDb)
//         await createTableInDataDb(table)
//     else
//         return 'A tabela já existe no banco de dados'

//     const existsTableInSystemDb = await tableData.findTableBynameInSystemDb(tableName)
//     if(!existsTableInSystemDb){
//         let tableReturn = await saveTableInDataSystem(table)
//         const columns = await columnsService.saveColumnsInDataSystem(tableReturn.id, table.columns)
//         tableReturn.columns = columns
//         return tableReturn
//     }
//     else
//         return 'A tabela já existe no sistema'
// }

// exports.findTableById = async function(id){
//     return await tableData.findTableById(id);
// }

// exports.deleteTable = async function(id){
//     return await tableData.deleteTable(id);
// }

exports.alterTable = async function(id, data){
    // const table = await tableData.findTableById(id)
    // buscar tabela por nome no banco de dados
    const oldName = table.nome
    const newName = data.nome
    if (oldName != newName){
       
    }
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

const alterNameTable = async function (oldName, newName){
    const existsTableInDataDb = await tableData.findTableBynameInDataDb(oldName)
    if (existsTableInDataDb != null)
        await tableData.alterTableInDataDb(oldName, newName)   
    else
        return 'A tabela não existe no banco de dados dos arquivos excels'
    const existsTableInSystemDb = await tableData.findTableBynameInSystemDb(oldName)
    if(existsTableInSystemDb != null)
        return await tableData.alterTable(id,data);
    else
        return 'A tabela não existe no banco de dados do sistema'
}