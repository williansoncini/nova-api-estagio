const express = require('express');
const router = express.Router();
const importCsvService = require('../../service/file/importCsvService')
const importService = require('../../service/file/importService')

router.post('/import'/*, authMiddleware*/,async function(req, res){
    const data = req.body;
    // const response = await importCsvService.importXlsxIntoTable(data)
    const response = await importService.importXlsxIntoTable(data)
    return res.json(response)
});

// Responsavel por criar a tabela automaticamente
router.post('/import/create'/*, authMiddleware*/,async function(req, res){
    const {} = req.body;
    // const response = await importCsvService.importXlsxIntoTable(data)
    const response = await importService.importXlsxAndCreateTable(data)
    return res.json(response)
});

module.exports = router;