const xlsxService = require('../../service/file/xslsxService')
const path = require('path')
const tableSystemService = require('../table/system/tableSystemService')
const tableInformationService = require('../table/data/tableInformationService')
const columnInformationService = require('../table/data/columnInformationService')
const columnsystemService = require('../table/system/columnSystemService')
const { insertDataIntoTable } = require('../../data/table/data/tableDataInformation')

exports.importXlsxIntoTable = async function (data) {
    const { nameXlsxFile, tabela_id } = data
    const xlsxBasePath = String(path.join(__dirname, '../../upload/'))
    const xlsxFilePath = xlsxBasePath + nameXlsxFile

    let table = {}
    let columns = {}
    try {
        const response = await tableSystemService.findTableById(tabela_id)
        if (response.status != 200)
            return { 'status': response.status, 'error': response.error }
        table = response.data.table
        columns = response.data.columns
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Erro ao consultar tabela no sistema!' }
    }

    // const columnsTable = columns.map((column) => {
    //     return column.nome
    // })

    const { header, body } = await xlsxService.getHeaderAndCellsFromXlsx(xlsxFilePath)
    console.log('Aqui')
    console.log(header)
    console.log(body)

    try {
        const insertStatement = xlsxService.makeInsertStatementWithBodyXlsx(table.nome, header, body)
        await insertDataIntoTable(insertStatement)
        return { 'status': 200, 'success': 'Dados inseridos na tabela com sucesso!', 'tabela_id': table.id }
    } catch (error) {
        return { 'status': 400, 'error': 'Colunas ou dados incompativel com a tabela, por favor revise os dados!' }
    }
}

const importXlsxAndCreateTable = async function (data, valueUser) {
    try {
        const { nameXlsxFile, table } = data
        const xlsxBasePath = String(path.join(__dirname, '../../upload/'))
        const xlsxFilePath = xlsxBasePath + nameXlsxFile
        let responseInformation = {}
        try {
            data.table.nome = data.table.nome.trim()
            responseInformation = await tableInformationService.createTable(data.table)
            if (responseInformation.status !== 200)
                return { 'status': responseInformation.status, 'error': responseInformation.error }
        } catch (error) {
            console.log(error)
            return { 'status': 400, 'error': 'Erro ai criar tabela no banco de dados!' }
        }

        let table_id = 0
        try {
            const responseSystem = await tableSystemService.saveTable(data.table, valueUser)
            if (responseSystem.status !== 200)
                return { 'status': responseSystem.status, 'error': responseSystem.error }
            if (responseSystem.status == 200)
                table_id = responseSystem.data.id
        } catch (error) {
            console.log(error)
            return { 'status': 400, 'error': 'Erro ai criar tabela no sistema!' }
        }

        const { header, body } = await xlsxService.getHeaderAndCellsFromXlsx(xlsxFilePath)
        let columns = {}
        try {
            columns = await xlsxService.getColumnsFromXlsx(header, body)
            console.log('ImportService')
            console.log(columns)
        } catch (error) {
            console.log(error)
            return { 'status': 400, 'error': 'Erro ao capturar colunas do arquivo Excel' }
        }

        const valuesColumns = {
            'tabela_id': table_id,
            'colunas': columns
        }

        let responseColumnSystemService = ''
        try {
            responseColumnSystemService = await columnsystemService.createColumns(valuesColumns, valueUser)
            if (responseColumnSystemService.error)
                return { 'status': responseColumnSystemService.status, 'error': responseColumnSystemService.error }
        } catch (error) {
            console.log(error)
            return { 'status': responseColumnSystemService.status, 'error': 'Falha ao criar tabela' }
        }

        let responseColumnInformationService = ''
        try {
            responseColumnInformationService = await columnInformationService.createColumns_new(valuesColumns)
            if (responseColumnInformationService.error)
                return { 'status': responseColumnInformationService.status, 'error': responseColumnInformationService.error }
        } catch (error) {
            console.log(error)
            return { 'status': responseColumnInformationService.status, 'error': 'Falha ao criar tabela' }
        }

        try {
            const insertStatement = xlsxService.makeInsertStatementWithBodyXlsx(table.nome, header, body)
            await insertDataIntoTable(insertStatement)
            return { 'status': 200, 'success': 'Tabela criada e dados inseridos com sucesso!', 'tabela_id': table_id }
        } catch (error) {
            console.log(error)
            return { 'status': 400, 'error': 'Erro ao capturar colunas do arquivo Excel' }
        }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': "Erro ao capturar dados do Excel" }
    }
}

exports.importXlsxAndCreateTable = importXlsxAndCreateTable