const express = require('express');
const router = express.Router();
const columnService = require('../service/columnService');

router.post('/columns', async function(req, res){
    const data = req.body;
    const menssage = await columnService.createColumn(data);
    return res.json(menssage);
})

router.get('/columns', async function(req, res){
    const data = await columnService.getAllColumns();
    return res.json(data)
})

router.get('/columns/:id', async function(req,res){
    const id = req.params.id;
    const data = await columnService.getColumnById(id);
    return res.json(data);
})

router.get('/columns/tables/:id', async function(req,res){
    const id = req.params.id;
    const data = await columnService.getColumnByIdTable(id);
    return res.json(data);
})

router.put('/columns/:id', async function(req, res){
    const id = req.params.id;
    const data = req.body;
    const response = await columnService.alterColumn(id, data);
    return res.json(response)
})

// falta realizar a mudanca para o campo desativo


module.exports = router;