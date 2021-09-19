const express = require('express');
const router = express.Router();
const tableService = require('../service/tableService')
const {authMiddleware} = require('../service/authService')

router.post('/tables/', authMiddleware, async function (req, res){
    const data = req.body;
    const table = await tableService.saveTable(data);
    return res.json(table);
});

router.put('/tables/:id', authMiddleware, async function(req, res){
    const id = req.params.id;
    const data = req.body;
    const alterTable = await tableService.alterTable(id, data);
    return res.json(alterTable);
});

router.delete('/tables/:id', authMiddleware, async function(req, res){
    const id = req.params.id;
    await tableService.deleteTable(id);
    return res.json('sucess!')
})

router.get('/tables/:id', authMiddleware, async function(req, res){
    const id = req.params.id;
    const table = await tableService.findTableById(id);
    return res.json(table);
})

router.get('/tables/', authMiddleware, async function(req, res){
    const tables = await tableService.getTables();
    return res.json(tables);
})

module.exports = router;