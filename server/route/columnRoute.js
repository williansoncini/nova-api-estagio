const express = require('express');
const router = express.Router();
const columnService = require('../service/columnService');
const {authMiddleware} = require('../service/authService')

router.post('/columns', authMiddleware, async function(req, res){
    const data = req.body;
    const menssage = await columnService.createColumn(data);
    return res.json(menssage);
})

router.get('/columns', authMiddleware, async function(req, res){
    const data = await columnService.getAllColumns();
    return res.json(data)
})

router.get('/columns/:id', authMiddleware, async function(req,res){
    const id = req.params.id;
    const data = await columnService.getColumnById(id);
    return res.json(data);
})

router.get('/columns/tables/:id', authMiddleware, async function(req,res){
    const id = req.params.id;
    const data = await columnService.getColumnByIdTable(id);
    return res.json(data);
})

router.put('/columns/:id', authMiddleware, async function(req, res){
    const id = req.params.id;
    const data = req.body;
    const response = await columnService.alterColumn(id, data);
    return res.json(response)
})

// falta realizar a mudanca para o campo desativo


module.exports = router;