const tableDataInformation = require('../../../data/table/data/tableDataInformation');

exports.createTable = async function(table){
    let existsTable = {}
    const tableName = table.nome
    try {
        existsTable = await getTableByNameOrNull(tableName)
    } catch (error) {
        console.log(error)
        return {'status':400,'error':'Falha ao consultar tabela no banco de dados de informações'}
    }
    
    if (existsTable == null){
        try {
            await tableDataInformation.createTable(table)
            return {'status':200,'sucess':`A tabela ${tableName} foi criada com sucesso!`}
        } catch (error) {
            console.log(error)
            return {'status':400,'error':`Falha ao criar a tabela ${tableName}!`}
        }
    }
    else{
        return {'status':400,'error':`A tabela '${tableName}' já existe`}
    }
}

exports.alterTable = async function(data, oldTableName){
    try {
        existsTable = await getTableByNameOrNull(oldTableName)
    } catch (error) {
        console.log(error)
        return {'status':400,'error':'Falha ao consultar tabela no banco de dados de informações'}
    }

    if (existsTable != null){
        try{
            const oldColumns = await tableDataInformation.findTableAndColumnsFromTableName(oldTableName)

            if(oldColumns.length != data.colunas.length)
                return {'status':400,'error':'Quantidade de colunas diferentes!'}

            // const duplicateColumn = checkExistsDuplicateColumns(data.colunas)
            // if (duplicateColumn)
            //     return {'status':400,'error':'Colunas duplicatas'}

            for (let i=0; i < oldColumns.length; i++){
                const oldColumn = oldColumns[i]
                const newColumn = data.colunas[i]
                if (oldColumn.tipo_coluna != newColumn.tipo_coluna){
                    await tableDataInformation.alterTypeColumn(oldTableName, oldColumn.nome, newColumn.tipo_coluna)
                }
                if (oldColumn.nome != newColumn.nome) {
                    await tableDataInformation.alterColumnName(oldTableName, oldColumn.nome, newColumn.nome)
                }
            }
        } catch (error){
            console.log(error)
            return {'status':400,"error":'Falha ao capturar as colunas da tabela!'}
        }
        const newName = data.nome
        if (newName != oldTableName){
            try {
                await tableDataInformation.alterNameTable(oldTableName, newName)
            } catch (error) {
                return {'status':400,"error":'Falha ao alterar o nome da tablea no banco de dados de informações'}
            }
        }
        
        return {'status':200,'sucess':`Tabela alterada com sucesso!`}
    }
    else{
        return {'status':400,'error':`A tabela '${oldTableName}' não foi encontrada!`}
    }
}

const getTableByNameOrNull = async function(tableName){
    return await tableDataInformation.getTableNameFromName(tableName)
    // return await tableDataInformation.findTableByname(tableName)
}

exports.getTableByNameOrNull = getTableByNameOrNull

exports.deleteTableByName = async function(tableName){
    let existsTable = {}
    try {
        existsTable = await getTableByNameOrNull(tableName)
    } catch (error) {
        return {'status':400,'error':'Falha ao consultar tabela no banco de dados de informações'}
    }
    if (existsTable != null){
        try {
            await tableDataInformation.deleteTable(tableName)
            return {'status':200,'sucess':`A tabela ${tableName} foi deletada com sucesso!`}
        } catch (error) {
            return {'status':400,'error':'Falha ao deletar a tabela no banco de dados de informações!'}
        }
    }
    else{
        return {'status':400,'error':`A tabela '${oldTableName}' não foi encontrada!`}
    }
}

exports.findTableAndColumnsFromTableName = async function(tableName){
    return tableDataInformation.findTableAndColumnsFromTableName(tableName)
}

// const checkExistsDuplicateColumns = function(columns){
//     let columnsForCheck = columns

//     for (let i=0; i < columns.length; i++){
//         if (columns[i].nome == columnsForCheck[i].nome)
            
//     }
// }

exports.getTableAndColumnFromId = async function(tableName){
    let existsTable = {}
    try {
        existsTable = await getTableByNameOrNull(tableName)
    } catch (error) {
        return {'status':400,'error':'Falha ao consultar tabela no banco de dados de informações'}
    }
    let columns = {}
    if (existsTable != null){
        try {
            columns = await tableDataInformation.findTableAndColumnsFromTableName(tableName)
        } catch (error) {
            return {'status':400,'error':'Falha ao consultar colunas no banco de dados de informações'}
        }
        if (columns != null){
            const table = {'table':existsTable.tablename,'columns': columns}
            return {'status':200,'sucess':'Tabela consultada com sucesso!','table':table}
        }
        return {'status':400,'error':'As colunas da tabela não foram encontradas!'}
    }
    else{
        return {'status':400,'error':`A tabela '${tableName}' não foi encontrada!`}
    }
}

exports.getTablesAndColummns = async function(tables){
    let responseTable = []

    if (tables.length == 0)
        return {'status':200, 'sucess':'Nenhuma tabela registrada!'}
    try {
        for (let index = 0; index < tables.length; index++) {
            const tableName = tables[index].nome
            responseTable.push({'table':tableName, 'columns': []})
        }
    } catch (error) {
        return {'status':400, 'error':'Falha ao formatar tabela!'}
    }
    let tablesAndColumns = {}
    try {
        tablesAndColumns = await tableDataInformation.getTablesAndColumns()
    } catch (error) {
        return {'status':400, 'error':'Falha ao coletar tabelas no banco de dados!'}        
    }
    try {
        responseTable = formaterTable(responseTable, tablesAndColumns)
    } catch (error) {
        return {'status':400, 'error':'Falha ao formatar tabelas!'}                        
    }
  
    return {'status':200,'sucess':'Tabelas consultadas com sucesso!', 'tables':responseTable}
}

const formaterTable = function(tablesSystem, tablesInformation){
    for (let i=0; i<tablesSystem.length; i++) {
        const tableName = tablesSystem[i].table;

        for (let j=0; j<tablesInformation.length; j++) {
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