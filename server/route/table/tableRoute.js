const express = require('express');
const router = express.Router();
const tableSystemService = require('../../service/table/system/tableSystemService')
const {authMiddleware} = require('../../service/user/authService')

router.post('/tables/', authMiddleware, async function (req, res){
    const data = req.body;
    const table = await tableSystemService.saveTable(data);
    return res.json(table);
});

router.put('/tables/:id', authMiddleware, async function(req, res){
    const id = req.params.id;
    const data = req.body;
   
    const alterTable = await tableSystemService.alterTable(id, data);
    return res.json(alterTable);
});

router.delete('/tables/:id', authMiddleware, async function(req, res){
    const response = await tableSystemService.deleteTable(req.params.id);
    res.json(response);
})

router.get('/tables/:id', authMiddleware, async function(req, res){
    const id = req.params.id;
    const table = await tableSystemService.findTableById(id);
    return res.json(table);
})

router.get('/tables/', authMiddleware, async function(req, res){
    const tables = await tableSystemService.getTables();
    return res.json(tables);
})

module.exports = router;