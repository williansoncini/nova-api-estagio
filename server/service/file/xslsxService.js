const ExcelJS = require('exceljs');

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
            // console.log(error)
        }
    }
    return rowsWithCells
}

function getCellsFromRows(rowsWithCells) {
    let cells = []
    for (let i = 0; i < rowsWithCells.length; i++) {
        let realCells = rowsWithCells[i]
        for (let o = 0; o < realCells.length; o++) {
            if (realCells[o])
                cells.push(realCells[o])
        }
    }
    return cells
}

function fillMatrixWithData(cells, matrizValues) {
    for (let i = 0; i < cells.length; i++) {
        rowNumber = cells[i]._row._number - 1
        columnNumber = cells[i]._column._number - 1
        matrizValues[rowNumber][columnNumber] = cells[i].value
    }
    return matrizValues
}

function fillMatrixWithDataWithOutHeader(cells, matrizValues) {
    for (let i = 0; i < cells.length; i++) {
        rowNumber = cells[i]._row._number - 1
        columnNumber = cells[i]._column._number - 1
        matrizValues[rowNumber-1][columnNumber] = cells[i].value
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

const getBodyFromXlsx = async function(filePath){
    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = await workbook.xlsx.readFile(filePath)
        const firtsPlanExcel = worksheet.worksheets[0].name
        const firstWorksheet = workbook.getWorksheet(firtsPlanExcel)

        const rows = firstWorksheet._rows
        
        const rowsWithCells = getValidRowsWithCells(rows)

        const rowsLength = rows.length 
        const columnsLength = rows[0]._cells.length
        const matrixValues = makeMatrixWithNullValues((rowsLength) -1, columnsLength)
        const cells = getCellsFromRows(rowsWithCells.slice(1))
        const matrix = fillMatrixWithDataWithOutHeader(cells, matrixValues)
        return matrix
    } catch (error) {
        console.log(error)
    }
}

exports.getBodyFromXlsx = getBodyFromXlsx

const getHeaderAndCellsFromXlsx = async function(filePath){
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
        const matrixValues = makeMatrixWithNullValues((rowsLength) -1, columnsLength)
        const cells = getCellsFromRows(rowsWithCells.slice(1))
        const matrix = fillMatrixWithDataWithOutHeader(cells, matrixValues)

        return {
            header:header,
            body: matrix
        }
    } catch (error) {
        console.log(error)
    }
}

exports.getHeaderAndCellsFromXlsx = getHeaderAndCellsFromXlsx