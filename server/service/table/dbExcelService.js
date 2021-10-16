const dbExcelData = require('../../data/dbExcelData')

exports.createTable = async function(tabela){
    // const table = tableService.findTableById(idTable)
    
    return await dbExcelData.createTable(tabela)
}

