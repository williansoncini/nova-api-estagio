const express = require('express');
const router = express.Router();
// const fs = require('fs');
const xlsxService = require('../../service/file/xslsxService')
const uploadFileService = require('../../service/file/uploadFileService')
const csvService = require('../../service/file/csvService');
const { authMiddleware } = require('../../service/user/authService');

router.post('/upload/excel', authMiddleware, async function (req, res) {
    if (!req.files || Object.keys(req.files).lenght === 0)
        return res.status(400).send('Nenhum arquivo encontrado');

    let savedFile = {}
    try {
        savedFile = await uploadFileService.saveFileAndReturnPath(req.files.excelFile)
        if (savedFile == '')
            return res.status(400).json({ 'error': 'Erro ao salvar aquivo!' })
    } catch (error) {
        return res.status(400).json({ 'error': 'Erro ao importar aquivo!' })
    }

    try {
        const filePath = savedFile.filePath
        const fileName = savedFile.fileName
        const HeaderAndBody = await xlsxService.getHeaderAndCellsFromXlsx(filePath)
        
        const data = {
            fileName: fileName,
            data: HeaderAndBody
        }
        return res.status(200).json({
            'success':'Arquivo salvo com sucesso!',
            'data':data
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ 'error': 'Erro ao coletar dados do arquivo!' })
    }

});

module.exports = router;