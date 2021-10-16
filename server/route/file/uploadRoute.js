const express = require('express');
const router = express.Router();
// const fs = require('fs');
const xlsxService = require('../../service/file/xslsxService')
const uploadFileService = require('../../service/file/uploadFileService')
const csvService = require('../../service/file/csvService')

router.post('/upload/excel'/*, authMiddleware*/,async function(req, res){
    if (!req.files || Object.keys(req.files).lenght === 0)
        return res.status(400).send('Nenhum arquivo encontrado');

    const savedFile = await uploadFileService.saveFileAndReturnPath(req.files.excelFile)
    const filePath = savedFile.filePath
    const fileName = savedFile.fileName
    const matrix = await xlsxService.makeMatrixWithDataXlsx(filePath)
    
    const data = {
        fileName:fileName,
        matrix:matrix
    }   
    return res.json(data)       
});

module.exports = router;