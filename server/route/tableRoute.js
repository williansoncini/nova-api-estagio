const express = require('express');
const router = express.Router();
const tableService = require('../service/tableService')

router.post('/tables/', async function (req, res){
    const data = req.body;
    const table = await tableService.saveTable(data);
    return res.json(table);
});

router.put('/tables/:id', async function(req, res){
    const id = req.params.id;
    const data = req.body;
    const alterTable = await tableService.alterTable(id, data);
    return res.json(alterTable);
});

router.delete('/tables/:id', async function(req, res){
    const id = req.params.id;
    await tableService.deleteTable(id);
    return res.json('sucess!')
})

router.get('/tables/:id', async function(req, res){
    const id = req.params.id;
    const table = await tableService.findTableById(id);
    return res.json(table);
})

router.get('/tables/', async function(req, res){
    const tables = await tableService.getTables();
    return res.json(tables);
})

module.exports = router;