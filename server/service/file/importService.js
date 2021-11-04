const importCsvData = require('../../data/importCsvData')
const csvService = require('../../service/file/csvService')
const xlsxService = require('../../service/file/xslsxService')
const path = require('path')

exports.importXlsxIntoTable = async function(data){
    const {nameXlsxFile, tableName} = data
    const xlsxBasePath = String(path.join(__dirname,'../upload/'))
    const xlsxFilePath = xlsxBasePath+nameXlsxFile

    await xlsxService.importXlsxIntoTable(xlsxFilePath)
    const matrix = await xlsxService.makeMatrixWithDataXlsx(xlsxFilePath)
    // const nameCsvFile = csvService.createCsvFromMatrix(matrix)
    // const csvBasePath = String(path.join(__dirname,'../csvFiles/'))
    // const csvFilePath = csvBasePath+nameCsvFile
    
    // return await importCsvData.importCsvIntoTable(csvFilePath, tableName)
    return 'working'
}

const importXlsxAndCreateTable = async function(){
    
    return 'sucess'
}

exports.importXlsxAndCreateTable = importXlsxAndCreateTable