const express = require('express');
const router = express.Router();
const importCsvService = require('../../service/file/importCsvService')
const importService = require('../../service/file/importService');
const { authMiddleware } = require('../../service/user/authService');

router.post('/import/table'/*, authMiddleware*/,async function(req, res){
    const data = req.body;
    try {
        const response = await importService.importXlsxIntoTable(data)
        if (response.status != 200){
            return res.status(response.status).json(response.error)
        }
        return res.status(response.status).json(response.success)
    } catch (error) {
        console.log(error)
        return res.status(400).json('Erro ao tentar importar dados!')
    }
});

// Responsavel por criar a tabela automaticamente
router.post('/import/create', authMiddleware,async function(req, res){
    const data = req.body;
    try {
        const response = await importService.importXlsxAndCreateTable(data)
        if (response.status != 200){
            return res.status(response.status).json(response.error)
        }
        return res.status(response.status).json(response.success)
    } catch (error) {
        return res.status(400).json('Erro ao tentar importar dados!')
    }
});

module.exports = router;