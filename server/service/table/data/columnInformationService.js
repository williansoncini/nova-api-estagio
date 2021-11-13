const tableSystemService = require('../system/tableSystemService')
const columnDataInformation = require('../../../data/table/data/columnDataInformation')
const columnSystemService = require('../system/columnSystemService')
const tableDataInformation = require('./tableInformationService')
const typeColumnService = require('../typeColumnService')
const { response } = require('express')

const createColumns = async function (data) {
    let existentTable
    try {
        const response = await tableSystemService.findTableById(data.tabela_id)
        existentTable = response.data.table
        if (existentTable == null)
            return { 'status': 400, 'error': 'Tabela não encontrada!' }
    } catch (error) {
        return { 'status': 400, 'error': 'Erro ao consultar tabela!' }
    }

    try {
        const existsTableDatabase = await tableDataInformation.getTableByNameOrNull(existentTable.nome)
        if (existsTableDatabase == null)
            return { 'status': 400, 'error': 'Tabela não encontrada!' }
    } catch (error) {
        return { 'status': 400, 'error': 'Falha ao consultar tabela no banco de dados de informações' }
    }

    try {
        await Promise.all(data.colunas.map(async (column) => {
            const data = {}
            data.nome = column.nome
            column.vazio == '0' ? data.vazio = 'not null' : data.vazio = ''
            const type = await typeColumnService.gettypeColumn(column.tipo_coluna_id)
            data.tipo_coluna_valor = type.valor
            return await columnDataInformation.createColumn(existentTable.nome, data)
        }))
        return { 'status': 200, 'success': 'Colunas criadas!' }
    } catch (error) {
        return { 'status': 400, 'error': 'Erro ao criar colunas!' }
    }
}

exports.createColumns = createColumns

exports.updateColumns = async function (data) {
    let existentTable
    try {
        const response = await tableSystemService.findTableById(data.tabela_id)
        existentTable = response.data.table
        if (existentTable == null)
            return { 'status': 400, 'error': 'Tabela não encontrada!' }
    } catch (error) {
        return { 'status': 400, 'error': 'Erro ao consultar tabela!' }
    }

    try {
        const existsTableDatabase = await tableDataInformation.getTableByNameOrNull(existentTable.nome)
        if (existsTableDatabase == null)
            return { 'status': 400, 'error': 'Tabela não encontrada!' }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Falha ao consultar tabela no banco de dados de informações' }
    }

    //Fazer a mudança
    let existentColumn = false
    data.colunas.map((coluna) => {
        const column = columnSystemService.getColumnById(coluna.id)
        if (column != null)
            existentColumn = true
    })
    if (existentColumn == false)
        return { 'status': 404, 'error': 'Coluna não encontrada!' }

    //Buscar todas as colunas
    let allColumns
    try {
        const response = await columnSystemService.getColumnByIdTable(data.tabela_id)
        allColumns = response.data
    } catch (error) {
        return { 'status': 400, 'error': 'Falha ao consultar tabela no banco de dados de informações' }
    }

    const colunas = data.colunas
    try {
        allColumns.map((column) => {
            colunas.map(async (coluna) => {
                if (column.id == coluna.id) {
                    if (column.nome != coluna.nome) {
                        await columnDataInformation.alterColumnName(existentTable.nome, column.nome, coluna.nome)
                    }
                    if (column.tipo_coluna_id != coluna.tipo_coluna_id) {
                        const type = await typeColumnService.gettypeColumn(coluna.tipo_coluna_id)
                        await columnDataInformation.alterTypeColumn(existentTable.nome, coluna.nome, type.valor)
                    }
                    if (column.vazio != coluna.vazio) {
                        if (coluna.vazio == 0)
                            await columnDataInformation.setNotNullColumn(existentTable.nome, coluna.nome)
                        else
                            await columnDataInformation.removeNotNullColumn(existentTable.nome, coluna.nome)
                    }
                }
            })
        })
        return { 'status': 200, 'success': 'Tabela alterada com sucesso!' }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Falha ao alterar colunas!' }
    }
}

exports.deleteColumn = async function (id) {
    let column = {}
    try {
        const response = await columnSystemService.getColumnById(id)
        // console.log(response)
        if (response.error != null)
            return { 'status': 404, 'error': 'Coluna não encontrada!' }
        column = response.data
        // console.log(column)
        // console.log('teste')
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Falha ao consultar coluna' }
    }

    let existentTable
    try {
        const response = await tableSystemService.findTableById(column.tabela_id)
        existentTable = response.data.table
        if (existentTable == null)
            return { 'status': 404, 'error': 'Tabela não encontrada!' }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Erro ao consultar tabela!' }
    }

    try {
        const existsTableDatabase = await tableDataInformation.getTableByNameOrNull(existentTable.nome)
        if (existsTableDatabase == null)
            return { 'status': 404, 'error': 'Tabela não encontrada!' }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Falha ao consultar tabela no banco de dados de informações' }
    }

    try {
        await columnDataInformation.deleteColumn(existentTable.nome, column.nome);
        return { 'status': 200, 'success': 'Coluna removida com sucesso!' }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Falha ao deletar a coluna no banco de dados de informações' }
    }
}

function hasDuplicate(array) {
    return (new Set(array)).size !== array.length;
}

const checkDuplicateNames = function (columns) {
    const nameColumns = columns.map((column) => { return column.nome })
    if (hasDuplicate(nameColumns)) {
        return true
    }
}

exports.checkDuplicateNames = checkDuplicateNames