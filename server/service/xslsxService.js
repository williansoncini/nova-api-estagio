const ExcelJS = require('exceljs')

exports.makeMatrixWithDataXlsx = async function(filePath){
    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = await workbook.xlsx.readFile(filePath) 
        const firtsPlanExcel = worksheet.worksheets[0].name
        const firstWorksheet = workbook.getWorksheet(firtsPlanExcel)

        const rows = firstWorksheet._rows
        const rowsLength = rows.length
        const columnsLength = rows[0]._cells.length

        let matrizValues = makeMatrixWithNullValues(rowsLength, columnsLength)
        let rowsWithCells = getValidRowsWithCells(rows)
        let cells = getCellsFromRows(rowsWithCells)
        matrizValues = fillMatrixWithData(cells,matrizValues)

        return matrizValues
    } catch (error) {
        console.log(error)  
        return res.status(500).json('Erro em makeMatrixWithDataXlsx')     
    }
}

function makeMatrixWithNullValues (rowsLength, columnsLength){
    return new Array(rowsLength).fill('null').map(() => new Array(columnsLength).fill('null'))
}

function getValidRowsWithCells(rows){
    let rowsWithCells = []
    for (let i=0; i < rows.length; i++){
        try {
            validRowWithCell = rows[i]._cells
            if (validRowWithCell)
                rowsWithCells.push(validRowWithCell)
        } catch (error) {
            
        }
    }
    return rowsWithCells
}

function getCellsFromRows(rowsWithCells){
    let cells = []
        for(let i=0; i < rowsWithCells.length;i++){
            let realCells = rowsWithCells[i]
            for (let o=0; o < realCells.length;o++){
                if (realCells[o])
                    cells.push(realCells[o])
            }
        }
    return cells
}

function fillMatrixWithData(cells, matrizValues){
    for(let i=0; i < cells.length; i++){
        rowNumber = cells[i]._row._number -1
        columnNumber = cells[i]._column._number -1
        matrizValues[rowNumber][columnNumber] = cells[i].value
    }
    return matrizValues
}