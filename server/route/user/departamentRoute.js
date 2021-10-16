const express = require('express');
const router = express.Router();
const departamentService = require('../../service/user/departamentService')
const {authMiddleware} = require('../../service/user/authService')

router.get('/departaments', authMiddleware ,async function (req, res){
    const departaments = await departamentService.getdepartaments();
    return res.json(departaments);
});

router.get('/departaments/:id', authMiddleware, async function (req, res){
    const departament = await departamentService.getdepartament(req.params.id);
    return res.json(departament);
});

router.post('/departaments', async function (req, res){
    const departament = req.body;
    const response = await departamentService.savedepartament(departament);
    res.json(response);
});

router.put('/departaments/:id', authMiddleware, async function (req, res){
    const data = req.body;
    const response = await departamentService.updatedepartament(req.params.id,data);
    res.json(response);
});

router.delete('/departaments/:id', authMiddleware, async function (req, res){
    const response = await departamentService.deletedepartament(req.params.id);
    res.json(response);
});

module.exports = router;