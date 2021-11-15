const tableDataInformation = require('../../../data/table/data/tableDataInformation');
const { checkDuplicateNames } = require('../system/columnSystemService');

exports.createTable = async function (table) {
    let existsTable = {}
    try {
        existsTable = await getTableByNameOrNull(table.nome)
        if (existsTable !== null)
            return { 'status': 400, 'error': 'Tabela já existente' }
    } catch (error) {
        return { 'status': 400, 'error': 'Falha ao consultar tabela no banco de dados de informações' }
    }

    try {
        await tableDataInformation.createTable(table)
        return { 'status': 200, 'success': `A tabela ${table.nome} foi criada com successo!` }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': `Falha ao criar a tabela ${table.nome}!` }
    }
}

exports.alterTable = async function (data, oldTableName) {
    try {
        existsTable = await tableDataInformation.getTableNameFromName(oldTableName)
        if (existsTable == null)
            return { 'status': 200, 'error': 'Tabela não encontrada no banco de dados' }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Falha ao consultar tabela no banco de dados de informações' }
    }

    if (oldTableName == data.nome)
        return { 'status': 200, 'success': `Tabela alterada com successo!` }

    try {
        await tableDataInformation.alterNameTable(oldTableName, data.nome)
        return { 'status': 200, 'success': `Tabela alterada com successo!` }
    } catch (error) {
        return { 'status': 400, "error": 'Falha ao alterar o nome da tablea no banco de dados de informações' }
    }
}

const getTableByNameOrNull = async function (tableName) {
    return await tableDataInformation.getTableNameFromName(tableName)
    // return await tableDataInformation.findTableByname(tableName)
}

exports.getTableByNameOrNull = getTableByNameOrNull

exports.deleteTableByName = async function (tableName) {
    let existsTable = {}
    try {
        existsTable = await getTableByNameOrNull(tableName)
    } catch (error) {
        return { 'status': 400, 'error': 'Falha ao consultar tabela no banco de dados de informações' }
    }
    if (existsTable != null) {
        try {
            await tableDataInformation.deleteTable(tableName)
            return { 'status': 200, 'success': `A tabela ${tableName} foi deletada com successo!` }
        } catch (error) {
            return { 'status': 400, 'error': 'Falha ao deletar a tabela no banco de dados de informações!' }
        }
    }
    else {
        return { 'status': 400, 'error': `A tabela '${oldTableName}' não foi encontrada!` }
    }
}

exports.findTableAndColumnsFromTableName = async function (tableName) {
    return tableDataInformation.findTableAndColumnsFromTableName(tableName)
}

// const checkExistsDuplicateColumns = function(columns){
//     let columnsForCheck = columns

//     for (let i=0; i < columns.length; i++){
//         if (columns[i].nome == columnsForCheck[i].nome)

//     }
// }

exports.getTableAndColumnFromId = async function (tableName) {
    let existsTable = {}
    try {
        existsTable = await getTableByNameOrNull(tableName)
    } catch (error) {
        return { 'status': 400, 'error': 'Falha ao consultar tabela no banco de dados de informações' }
    }
    let columns = {}
    if (existsTable != null) {
        try {
            columns = await tableDataInformation.findTableAndColumnsFromTableName(tableName)
        } catch (error) {
            return { 'status': 400, 'error': 'Falha ao consultar colunas no banco de dados de informações' }
        }
        if (columns != null) {
            const table = { 'table': existsTable.tablename, 'columns': columns }
            return { 'status': 200, 'success': 'Tabela consultada com successo!', 'table': table }
        }
        return { 'status': 400, 'error': 'As colunas da tabela não foram encontradas!' }
    }
    else {
        return { 'status': 400, 'error': `A tabela '${tableName}' não foi encontrada!` }
    }
}

exports.getTablesAndColummns = async function (tables) {
    let responseTable = []

    if (tables.length == 0)
        return { 'status': 200, 'success': 'Nenhuma tabela registrada!' }
    try {
        for (let index = 0; index < tables.length; index++) {
            const tableName = tables[index].nome
            responseTable.push({ 'table': tableName, 'columns': [] })
        }
    } catch (error) {
        return { 'status': 400, 'error': 'Falha ao formatar tabela!' }
    }
    let tablesAndColumns = {}
    try {
        tablesAndColumns = await tableDataInformation.getTablesAndColumns()
    } catch (error) {
        return { 'status': 400, 'error': 'Falha ao coletar tabelas no banco de dados!' }
    }
    try {
        responseTable = formaterTable(responseTable, tablesAndColumns)
    } catch (error) {
        return { 'status': 400, 'error': 'Falha ao formatar tabelas!' }
    }

    return { 'status': 200, 'success': 'Tabelas consultadas com successo!', 'tables': responseTable }
}

const formaterTable = function (tablesSystem, tablesInformation) {
    for (let i = 0; i < tablesSystem.length; i++) {
        const tableName = tablesSystem[i].table;

        for (let j = 0; j < tablesInformation.length; j++) {
            if (tableName == tablesInformation[j].table)
                tablesSystem[i].columns.push({
                    'nome': tablesInformation[j].nome,
                    'vazio': 0,
                    'tipo_coluna': tablesInformation[j].tipo_coluna
                }
                )
        }
    }

    return tablesSystem
}

exports.makeInsertStatement = function (tableName, header, body) {
    statement = `INSERT INTO ${tableName} (`
    headerLength = header.length
    statement += header.map((column, index) => {
        if (index == headerLength - 1)
            return `${column}) values`
        else
            return `${column}`
    })

    const boyLength = body.length
    body.map((row, rowIndex) => {
        const rowLength = row.length
        statement += '('
        row.map((value, index) => {
            type = typeof (value)
            if (type == 'string') {
                statement += `'${value}'`
            }
            else {
                statement += `${value}`
            }
            if (index != rowLength - 1)
                statement += ','
        })
        statement += ')'
        if (rowIndex != boyLength - 1)
            statement += ','

    })
    statement += ';'
    return statement
}