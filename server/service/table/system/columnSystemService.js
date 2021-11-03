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

exports.getColumnById = async function (id) {
    return await columnData.getColumnById(id);
}

const getColumnByIdTable = async function (id) {
    try {
        const columns = await columnData.getColumnByIdTable(id)
        // console.log(columns)
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

exports.updateColumn = async function (data) {
    let existentTable
    try {
        existentTable = await tableSystemService.findTableById(data.tabela_id)
        if (existentTable == null)
            return { 'status': 400, 'error': 'Tabela não encontrada!' }
    } catch (error) {
        return { 'status': 400, 'error': 'Erro ao consultar tabela!' }
    }

    try {
        if (data.coluna.nome != existentTable.nome) {
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
        }
    } catch (error) {
        return { 'status': 400, 'error': 'Erro ao checar duplicidade!' }
    }

    if (existentTable.tipo_coluna_id != data.coluna.tipo_coluna_id) {
        await tableDataInformation.alterTypeColumn(existentTable.nome, .nome, data.coluna.tipo_coluna)
    }
    if (existentTable.vazio != data.coluna.ativo) {
        await tableDataInformation.alterTypeColumn(oldTableName, existentTable.nome, data.coluna.tipo_coluna)
    }
    if (existentTable.nome != data.coluna.nome) {
        await tableDataInformation.alterColumnName(oldTableName, existentTable.nome, data.coluna.nome)
    }

}

exports.deleteColumn = async function (id) {
    return await columnData.deleteColumn(id);
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


// try {
//     const oldColumns = await tableDataInformation.findTableAndColumnsFromTableName(oldTableName)

//     // if (oldColumns.length != data.colunas.length)
//     //     return { 'status': 400, 'error': 'Quantidade de colunas diferentes!' }

//     // const duplicateColumn = checkExistsDuplicateColumns(data.colunas)
//     // if (duplicateColumn)
//     //     return {'status':400,'error':'Colunas duplicatas'}

//     for (let i = 0; i < oldColumns.length; i++) {
//         const oldColumn = oldColumns[i]
//         const newColumn = data.colunas[i]
//         if (oldColumn.tipo_coluna != newColumn.tipo_coluna) {
//             await tableDataInformation.alterTypeColumn(oldTableName, oldColumn.nome, newColumn.tipo_coluna)
//         }
//         if (oldColumn.nome != newColumn.nome) {
//             await tableDataInformation.alterColumnName(oldTableName, oldColumn.nome, newColumn.nome)
//         }
//     }

exports.checkDuplicateNames = checkDuplicateNames