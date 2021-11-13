const ExcelJS = require('exceljs');
const { response } = require('express');
const typeColumnsService = require('../table/typeColumnService')

exports.makeMatrixWithDataXlsx = async function (filePath) {
    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = await workbook.xlsx.readFile(filePath)
        const firtsPlanExcel = worksheet.worksheets[0].name
        const firstWorksheet = workbook.getWorksheet(firtsPlanExcel)

        const rows = firstWorksheet._rows
        const rowsLength = rows.length
        const columnsLength = rows[0]._cells.length

        let matrixValues = makeMatrixWithNullValues(rowsLength, columnsLength)
        let rowsWithCells = getValidRowsWithCells(rows)
        let cells = getCellsFromRows(rowsWithCells)

        const matrix = fillMatrixWithData(cells, matrixValues)
        return matrix

    } catch (error) {
        console.log(error)
        return res.status(400).json('Erro em makeMatrixWithDataXlsx')
    }
}

function makeMatrixWithNullValues(rowsLength, columnsLength) {
    return new Array(rowsLength).fill(null).map(() => new Array(columnsLength).fill(null))
}

function getValidRowsWithCells(rows) {
    let rowsWithCells = []
    for (let i = 0; i < rows.length; i++) {
        try {
            validRowWithCell = rows[i]._cells
            if (validRowWithCell)
                rowsWithCells.push(validRowWithCell)
        } catch (error) {
            console.log(error)
        }
    }
    return rowsWithCells
}

function getCellsFromRows(rowsWithCells) {
    let cells = []
    for (let i = 0; i < rowsWithCells.length; i++) {
        let realCells = rowsWithCells[i]
        for (let o = 0; o < realCells.length; o++) {
            if (realCells[o]) {
                cells.push(realCells[o])
            }
        }
    }
    return cells
}

function fillMatrixWithData(cells, matrizValues) {
    for (let i = 0; i < cells.length; i++) {
        rowNumber = cells[i]._row._number - 1
        columnNumber = cells[i]._column._number - 1
        if (cells[i].value.result) {
            matrizValues[rowNumber][columnNumber] = cells[i].value.result
            console.log(cells[i].value)
        } else {
            console.log(cells[i])
            matrizValues[rowNumber][columnNumber] = cells[i].value
        }
    }
    return matrizValues
}

function fillMatrixWithDataWithOutHeader(cells, matrizValues) {
    for (let i = 0; i < cells.length; i++) {
        rowNumber = cells[i]._row._number - 1
        columnNumber = cells[i]._column._number - 1
        if (cells[i].value.result)
            matrizValues[rowNumber - 1][columnNumber] = cells[i].value.result
        else
            matrizValues[rowNumber - 1][columnNumber] = cells[i].value
    }
    return matrizValues
}

const importXlsxIntoTable = async function (xlsxFilePath) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = await workbook.xlsx.readFile(xlsxFilePath)
    const firtsPlanExcel = worksheet.worksheets[0].name
    const firstWorksheet = workbook.getWorksheet(firtsPlanExcel)

    const rows = firstWorksheet._rows
    const rowsLength = rows.length
    const columnsLength = rows[0]._cells.length

    const rowsWithCells = getValidRowsWithCells(rows)
    const cells = getCellsFromRows(rowsWithCells)


    for (let i = 0; i < cells.length; i++) {
        rowNumber = cells[i]._row._number - 1
        columnNumber = cells[i]._column._number - 1
    }
}
exports.importXlsxIntoTable = importXlsxIntoTable

const getColumnsFromXlsx = async function (filePath) {
    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = await workbook.xlsx.readFile(filePath)
        const firtsPlanExcel = worksheet.worksheets[0].name
        const firstWorksheet = workbook.getWorksheet(firtsPlanExcel)

        const rows = firstWorksheet._rows
        const rowsWithCells = getValidRowsWithCells(rows)

        const header = getColumnsFromCells(rowsWithCells[0])
        return header
    } catch (error) {
        console.log(error)
    }
}

exports.getColumnsFromXlsx = getColumnsFromXlsx

const getColumnsFromCells = function (rowsWithCells) {
    let header = []
    for (let i = 0; i < rowsWithCells.length; i++) {
        if (rowsWithCells[i])
            header.push(rowsWithCells[i].value)
    }
    return header
}

const getBodyFromXlsx = async function (filePath) {
    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = await workbook.xlsx.readFile(filePath)
        const firtsPlanExcel = worksheet.worksheets[0].name
        const firstWorksheet = workbook.getWorksheet(firtsPlanExcel)

        const rows = firstWorksheet._rows

        const rowsWithCells = getValidRowsWithCells(rows)

        const rowsLength = rows.length
        const columnsLength = rows[0]._cells.length
        const matrixValues = makeMatrixWithNullValues((rowsLength) - 1, columnsLength)
        const cells = getCellsFromRows(rowsWithCells.slice(1))
        const matrix = fillMatrixWithDataWithOutHeader(cells, matrixValues)
        return matrix
    } catch (error) {
        console.log(error)
    }
}

exports.getBodyFromXlsx = getBodyFromXlsx

const getHeaderAndCellsFromXlsx = async function (filePath) {
    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = await workbook.xlsx.readFile(filePath)
        const firtsPlanExcel = worksheet.worksheets[0].name
        const firstWorksheet = workbook.getWorksheet(firtsPlanExcel)
        const rows = firstWorksheet._rows
        const rowsWithCells = getValidRowsWithCells(rows)
        const header = getColumnsFromCells(rowsWithCells[0])

        const rowsLength = rows.length
        const columnsLength = rows[0]._cells.length
        const matrixValues = makeMatrixWithNullValues((rowsLength) - 1, columnsLength)
        const cells = getCellsFromRows(rowsWithCells.slice(1))
        const matrix = fillMatrixWithDataWithOutHeader(cells, matrixValues)

        return {
            header: header,
            body: matrix
        }
    } catch (error) {
        console.log(error)
    }
}

exports.getHeaderAndCellsFromXlsx = getHeaderAndCellsFromXlsx

const makeCreateTableStatementWithHeaderAndBody = function (header, body) {
    const table = tabela.table
    const columns = tabela.columns

    const columnsLength = columns.length

    statement = `CREATE TABLE ${table.nome} (`
    for (var index in columns) {
        if (index == columnsLength - 1)
            statement += `${columns[index].nome}`
        else
            statement += `${columns[index].nome},`
    }

    statement += ');'

    return statement
}

exports.makeCreateTableStatementWithHeaderAndBody = makeCreateTableStatementWithHeaderAndBody

exports.createStatementCreateTable = function (tableName, header, body) {
    typeData = []
    body[0].map((column) => {
        const type = typeof (column)
        if (type == 'number') {
            if (Number.isInteger(column))
                typeData.push('INT')
            else
                typeData.push('DECIMAL(18,4)')
        } else if (type == 'string') {
            typeData.push('VARCHAR')
        }
    })

    statement = `CREATE TABLE IF NOT EXISTS ${tableName} (`
    lenghHeader = header.length
    header.map((column, index) => {
        if (index == lenghHeader - 1)
            statement += `${column} ${typeData[index]});`
        else
            statement += `${column} ${typeData[index]},`
    })

    return statement
}

exports.getColumnsFromXlsx = async function (header, body) {
    columnsName = []
    header.map((column) => {
        columnsName.push(column)
    })

    const response = await typeColumnsService.gettypeColumns()
    const typecolumns = response.data

    let typeData = []
    body[0].map((column) => {
        const type = typeof (column)
        if (type == 'number') {
            if (Number.isInteger(column))
                typeData.push('INT')
            else
                typeData.push('DECIMAL')
        } else if (type == 'string') {
            typeData.push('VARCHAR')
        }
    })

    let typeColumns_id = []
    typeData.map((type) => {
        typecolumns.map((typeColumn) => {
            if (type == typeColumn.valor) {
                typeColumns_id.push(typeColumn.id)
            }
        })
    })

    columns = columnsName.map((column, index) => {
        return {
            'nome': column,
            'vazio': '1',
            'tipo_coluna_id': typeColumns_id[index]
        }
    })
    return columns
}

exports.makeInsertStatementWithBodyXlsx = function (tableName, header, body) {
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