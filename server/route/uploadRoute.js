const express = require('express');
// const { authMiddleware } = require('../service/authService');
const router = express.Router();
const xlsx = require('node-xlsx');
const ExcelJS = require('exceljs')
const path = require('path')
const fs = require('fs');
const { none } = require('../infra/database_system');

router.post('/upload/excel'/*, authMiddleware*/,async function(req, res){
    if (!req.files || Object.keys(req.files).lenght === 0)
        return res.status(400).send('Nenhum arquivo encontrado');

    const uploadFile = req.files.excelFile;
    const uploadPath = String(path.join(__dirname,'../upload/')) + uploadFile.name
    
    await uploadFile.mv(uploadPath, function(err){
        if (err)
        return res.status(500).json('Deu ruim!')
    })
    const filePathSync = fs.realpathSync(uploadPath, {encoding:'utf8'})

    try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = await workbook.xlsx.readFile(filePathSync) 
        const firtsPlanExcel = worksheet.worksheets[0].name
        const firstWorksheet = workbook.getWorksheet(firtsPlanExcel)

        const rows = firstWorksheet._rows
        const rowsLength = rows.length
        const columnsLength = rows[0]._cells.length

        let matrizValues = new Array(rowsLength).fill('null').map(() => new Array(columnsLength).fill('null'))

        let rowWithCell = []
        for (let i=0; i < rows.length; i++){
            try {
                validRowWithCell = rows[i]._cells
                if (validRowWithCell)
                    rowWithCell.push(validRowWithCell)
            } catch (error) {
                console.log('Linha vazia')     
            }
        }

        let cells = []
        for(let i=0; i < rowWithCell.length;i++){
            let realCells = rowWithCell[i]
            for (let o=0; o < realCells.length;o++){
                if (realCells[o])
                    cells.push(realCells[o])
            }
        }
       
        console.log(cells)

        for(let i=0; i < cells.length; i++){
            rowNumber = cells[i]._row._number -1
            columnNumber = cells[i]._column._number -1
            matrizValues[rowNumber][columnNumber] = cells[i].value
        }

        console.log(matrizValues)

    } catch (error) {
        console.log(error)  
        return res.status(500).json('Deu ruim! na abertura do arquivo')     
    }

    fs.unlinkSync(uploadPath)
    return res.json('Sucess')       
});

module.exports = router;