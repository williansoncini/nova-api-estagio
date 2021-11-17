const tableDataInformation = require('../../data/table/data/tableDataInformation')
const tableInformationService = require('./data/tableInformationService')
const tableSystemService = require("./system/tableSystemService")

exports.insertDataIntoTable = async function (id, data){
    let table = {}
    let columns = {}
    try {
        const response = await tableSystemService.findTableById(id)
        if (response.status != 200)
            return {'status':response.status, 'error':response.error}
        table = response.data.table
        columns = response.data.columns
    } catch (error) {
        console.log(error)
        return {'status':400, 'error':'Erro ao consultar tabela no sistema!'}
    }

    const columnsTable = columns.map((column) => {
        return column.nome
    })
    let statement = ''
    try {
        statement = tableInformationService.makeInsertStatement(table.nome, columnsTable, data)
    } catch (error) {
        return {'status':400, 'error':'Erro ao montar input de dados!'}
    }
    
    try {
        await tableDataInformation.insertDataIntoTable(statement)
        return {'status':200,'success':'Dados importados!'}
    } catch (error) {
        console.log(error)
        return {'status':400, 'error':'Dados invalidos para tabela!'}
    }
}


exports.getDataFromTable = async function (id){
    let table = {}
    try {
        const response = await tableSystemService.findTableById(id)
        if (response.status != 200)
            return {'status':response.status, 'error':response.error}
        table = response.data.table
    } catch (error) {
        console.log(error)
        return {'status':400, 'error':'Erro ao consultar tabela no sistema!'}
    }

    try {
        const data = await tableDataInformation.getDataFromTable(table.nome)
        if (data != null){
            const arrrayData = data.map((row) => {
                return Object.values(row)
            })
            console.log(arrrayData)
            return {'status':200, 'success':'Dados consultados com sucesso!', 'data':arrrayData}
            // return {'status':200, 'success':'Dados consultados com sucesso!', 'data':data}
        }

    } catch (error) {
        console.log(error)
        return {'status':400,'error':'Erro ao consultar dados!'}
    }
}