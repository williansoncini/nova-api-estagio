const express = require('express');
const router = express.Router();
const categoryService = require('../../service/table/categoryService')
const {authMiddleware} = require('../../service/user/authService')

router.get('/categorys', authMiddleware ,async function (req, res){
    try {
        const categorys = await categoryService.getcategorys();    
        return res.status(200).json({'success':'Dados consultados com sucesso!', 'data':categorys})
    } catch (error) {
        return res.status(400).json({'error':'Falha ao consultar categorias!'})
    }
});

router.get('/categorys/:id', authMiddleware, async function (req, res){
    const category = await categoryService.getcategory(req.params.id);
    return res.json(category);
});

router.post('/categorys', authMiddleware, async function (req, res){
    const category = req.body;
    const response = await categoryService.savecategory(category);
    res.json(response);
});

router.put('/categorys/:id', authMiddleware, async function (req, res){
    const data = req.body;
    await categoryService.updatecategory(req.params.id,data);
    res.end();
});

router.delete('/categorys/:id', authMiddleware, async function (req, res){
    const response = await categoryService.deletecategory(req.params.id);
    res.json(response);
});

module.exports = router;