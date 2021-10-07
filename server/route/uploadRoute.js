const express = require('express');
const router = express.Router();
// const fs = require('fs');
const xlsxService = require('../service/xslsxService')
const uploadFileService = require('../service/uploadFileService')

router.post('/upload/excel'/*, authMiddleware*/,async function(req, res){
    if (!req.files || Object.keys(req.files).lenght === 0)
        return res.status(400).send('Nenhum arquivo encontrado');

    filePath = await uploadFileService.saveFileAndReturnPath(req.files.excelFile)
    // const uploadFile = req.files.excelFile;
    // const uploadPath = String(path.join(__dirname,'../upload/')) + uploadFile.name
    
    // await uploadFile.mv(uploadPath, function(err){
    //     if (err)
    //     return res.status(500).json('Deu ruim!')
    // })
    // const filePathSync = fs.realpathSync(uploadPath, {encoding:'utf8'})
    const matrix = await xlsxService.makeMatrixWithDataXlsx(filePath)
 
    // fs.unlinkSync(uploadPath)
    await uploadFileService.deleteFileFromPath(filePath)
    return res.json(matrix)       
});

module.exports = router;