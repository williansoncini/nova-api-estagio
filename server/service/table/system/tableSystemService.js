const tableDataSystem = require('../../../data/table/system/tableDataSystem');
const columnsService = require('./columnSystemService')
const categoryService = require('../categoryService')

exports.saveTable = async function (table) {
    let existsTable = {}
    try {
        existsTable = await tableDataSystem.getTableByNameOrNull(table.nome)
        if (existsTable != null)
            return { 'status': 400, 'error': `Falha ao cadastrar! A tabela '${table.nome}' já existe!` }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Não foi possível consultar a tabela no banco de dados' }
    }

    try {
        const createdTable = await tableDataSystem.saveTable(table)
        return { 'status': 200, 'success': `A tabela ${table.nome} foi salva com successo!`, 'data': createdTable }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'success': `Falha ao salvar a tabela '${table.nome}'!` }
    }
}

exports.findTableById = async function (id) {
    let table = {}
    try {
        table = await tableDataSystem.findTableById(id)
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Não foi possível encontrar a tabela no banco de dados' }
    }
    if (table != null) {
        let columns = {}
        try {
            const response = await columnsService.getColumnByIdTable(id)
            if (response.status !== 200)
                return { 'status': response.status, 'error': response.error }

            columns = response.data
            return {
                'status': response.status, 'success': 'Tabela consultada com sucesso!', 'data': {
                    'table': table,
                    'columns': columns
                }
            }
        } catch (error) {
            return { 'status': 400, 'error': 'Falha ao consultar colunas!' }
        }
    }
}

exports.deleteTable = async function (id) {
    let existsTable = {}
    try {
        existsTable = await tableDataSystem.findTableById(id)
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Não foi possível consultar a tabela no banco de dados' }
    }
    if (existsTable != null) {
        try {
            await tableDataSystem.deleteTable(id);
            return { 'status': 200, 'success': `A tabela '${existsTable.nome}' foi deletada com successo!`, 'tableName': existsTable.nome }
        } catch (error) {
            console.log(error)
            return { 'status': 400, 'error': `A tabela '${existsTable.nome}' não pode ser deletada` }
        }
    }
    return { 'status': 400, 'error': `A tabela não pode ser encontrada!` }
}

exports.alterTable = async function (id, data) {
    let table = {}
    try {
        table = await tableDataSystem.findTableById(id)
        if (table == null)
            return { 'status': 404, 'error': 'Tabela não encontrada!' }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Erro ao procurar a tabela!' }
    }

    if (table.nome === data.nome && table.ativa === data.ativa && table.categoria_id === data.categoria_id)
        return { 'status': 304, 'success': 'Nada a ser alterado!' }

    try {
        if (data.nome != table.nome) {
            const existsTable = await tableDataSystem.getTableByNameOrNull(data.nome)
            if (existsTable != null)
                return { 'status': 400, 'error': 'Nome de tabela já existente!' }
        }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Erro ao procurar a tabela!' }
    }

    try {
        const existentCategory = await categoryService.getcategory(data.categoria_id)
        if (existentCategory == null)
            return { 'status': 400, 'error': 'Categoria invalida!' }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Erro ao procurar categoria!' }
    }

    try {

        const updatedTable = tableDataSystem.alterTable(id, data)
        return {
            'status': 200, 'success': 'Tabela alterada com successo!', 'data': {
                'oldTableName': table.nome,
                'newData': updatedTable
            }
        }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Erro ao alterar a tabela no sistema' }
    }
}

exports.geTables = async function () {
    try {
        const tables = await tableDataSystem.getTables();
        return { 'status': 200, 'success': 'Tabelas consultadas com successo!', 'tables': tables }
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Não foi possível coletar todas as tabelas' }
    }
}



