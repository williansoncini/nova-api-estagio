const columnData = require('../../../data/table/system/columnDataSystem');
const tableSystemService = require('./tableSystemService')


const createColumns = async function (data) {
    try {
        const existentTable = await tableSystemService.findTableById(data.tabela_id)
        if (existentTable == null)
            return { 'status': 400, 'error': 'Tabela não encontrada!' }
    } catch (error) {
        return { 'status': 400, 'error': 'Erro ao consultar tabela!' }
    }

    let duplicateColumns = checkDuplicateNames(data.colunas)
    if (duplicateColumns)
        return { 'status': 400, 'error': 'Existem colunas duplicadas!' }

    try {
        const response = await getColumnByIdTable(data.tabela_id)
        const allColumns = response.data
        const nameColumns = allColumns.map((column) => {
            return column.nome
        })
        data.colunas.map((column) => {
            duplicateColumns = nameColumns.includes(column.nome)
        })
        if (duplicateColumns) {
            return { 'status': 400, 'error': 'Existem colunas duplicadas!' }
        }
    } catch (error) {
        return { 'status': 400, 'error': 'Erro ao checar duplicidade!' }
    }

    try {
        await data.colunas.map(async (column) => {
            await columnData.createColumn(data.tabela_id, column)
        })
        return { 'status': 200, 'success': 'Colunas criadas!' }
    } catch (error) {
        return { 'status': 400, 'error': 'Erro ao criar colunas!' }
    }
}

exports.createColumns = createColumns

exports.getAllColumns = async function () {
    return await columnData.getAllColumns();
}

const getColumnById = async function (id) {
    try {
        const column = await columnData.getColumnById(id);
        if (column == null)
            return { 'status': 404, 'error': 'Coluna não encontrada' }
        return { 'status': 200, 'success': 'Coluna encontrada com sucesso!', 'data': column }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Falha ao consultar tabela' }
    }
}

exports.getColumnById = getColumnById

const getColumnByIdTable = async function (id) {
    try {
        const columns = await columnData.getColumnByIdTable(id)
        if (columns != null) {
            return { 'status': 200, 'success': 'Colunas encontradas', 'data': columns }
        }
        else return { 'status': 200, 'success': 'Colunas não encontradas' }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Falha ao consultar colunas' }
    }
}

exports.getColumnByIdTable = getColumnByIdTable

exports.updateColumns = async function (data) {
    const tabela_id = data.tabela_id
    const colunas = data.colunas
    //Checar duplicidade
    let duplicateColumns = checkDuplicateNames(colunas)
    if (duplicateColumns)
        return { 'status': 400, 'error': 'Existem colunas duplicadas nos campso!' }

    let existentColumn = false
    colunas.map((coluna) => {
        const column = getColumnById(coluna.id)
        if (column != null)
            existentColumn = true
    })
    if (existentColumn == false)
        return { 'status': 404, 'error': 'Coluna não encontrada!' }

    //Checar nomes
    try {
        const response = await getColumnByIdTable(tabela_id)
        const allColumns = response.data
        const nameColumns = allColumns.map((column) => {
            return column.nome
        })
        allColumns.map((column) => {
            colunas.map((coluna) => {
                if (column.id == coluna.id) {
                    if (column.nome != coluna.nome) {
                        const duplicateValue = nameColumns.includes(coluna.nome)
                        if (duplicateValue)
                            duplicateColumns = true
                    }
                }
            })
        })
        if (duplicateColumns)
            return { 'status': 400, 'error': 'Existem colunas duplicadas!' }

    } catch (error) {
        return { 'status': 400, 'error': 'Erro ao checar duplicidade!' }
    }

    try {
        colunas.map(async (column) => {
            await columnData.alterColumn(column)
        })
        return { 'status': 200, 'success': 'Colunas alteradas!' }
    } catch (error) {
        return { 'status': 400, 'error': 'Erro ao checar duplicidade!' }
    }
}

exports.deleteColumn = async function (id) {
    let column = {}
    try {
        const response = await getColumnById(id)
        if (response.error != null)
            return { 'status': 400, 'error': 'Falha ao consultar coluna' }
        column = response.data
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Falha ao consultar coluna' }
    }

    let existentTable
    try {
        const response = await tableSystemService.findTableById(column.tabela_id)
        existentTable = response.data.table
        if (existentTable == null)
            return { 'status': 400, 'error': 'Tabela não encontrada!' }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Erro ao consultar tabela!' }
    }

    try {
        await columnData.deleteColumn(id);
        return { 'status': 200, 'success': 'Coluna deletada com sucesso!' }
    } catch (error) {
        return { 'status': 400, 'error': 'Falha ao deletar coluna!' }
    }
}

const saveColumnsInDataSystem = async function (tableId, columns) {
    const columnsLength = columns.length
    let returnColumns = []
    for (let i = 0; i < columnsLength; i++) {
        returnColumns.push(await createColumn(tableId, columns[i]))
    }
    return returnColumns
}

exports.saveColumnsInDataSystem = saveColumnsInDataSystem

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