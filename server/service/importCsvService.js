

exports.importCsvService = async function(filePath){
    await importCsvData.importCsvIntoTable(filePath, tableName)
}