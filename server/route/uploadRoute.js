const express = require('express');
const router = express.Router();
// const fs = require('fs');
const xlsxService = require('../service/xslsxService')
const uploadFileService = require('../service/uploadFileService')
const csvService = require('../service/csvService')

router.post('/upload/excel'/*, authMiddleware*/,async function(req, res){
    if (!req.files || Object.keys(req.files).lenght === 0)
        return res.status(400).send('Nenhum arquivo encontrado');

    filePath = await uploadFileService.saveFileAndReturnPath(req.files.excelFile)
    const matrix = await xlsxService.makeMatrixWithDataXlsx(filePath)
    try {
        csvService.createCsvFromMatrix(matrix)
    } catch (error) {
        console.log(error)
    }
    await uploadFileService.deleteFileFromPath(filePath)
    return res.json(matrix)       
});

module.exports = router;