const express = require('express');
const router = express.Router();
const categoryService = require('../../service/table/categoryService')
const {authMiddleware} = require('../../service/user/authService')

router.get('/categorys', authMiddleware ,async function (req, res){
    try {
        const response = await categoryService.getcategorys();    
        if (response.status == 200)
            return res.status(response.status).json({'success':response.success, 'data':response.data})
    } catch (error) {
        return res.status(400).json({'error':'Falha ao consultar categorias!'})
    }
});

router.get('/categorys/:id', authMiddleware, async function (req, res){
    try {
        const id = req.params.id
        const response = await categoryService.getCategory(id);
        if (response.status == 200)
            return res.status(response.status).json({'success':response.success, 'data':response.data})
        return res.status(response.status).json(response.error)
    } catch (error) {
        console.log(error)
        return res.status(400).json('Falha ao consultar a categoria!')
    }
});

router.post('/categorys', authMiddleware, async function (req, res){
    let category
    try {
        category = req.body;
        console.log(category)
    } catch (error) {
        console.log(error)
        return res.status(400).json({'error':'Falha ao receber dados no banco de dados!'})
    }
    try {
        const response = await categoryService.savecategory(category);
        if (response.status == 200)
            return res.status(response.status).json({'success:':response.success, 'data':response.data})
        return res.status(response.status).json(response.error)
    } catch (error) {
        console.log(error)
        return res.status(400).json({'error':'Falha ao salvar categoria!'})
    }
});

router.put('/categorys/:id', authMiddleware, async function (req, res){
    try {
        const data = req.body;
        const id = req.params.id
        const response = await categoryService.updatecategory(id,data);
        if (response.status == 200)
            return res.status(response.status).json(response.success)
        return res.status(response.status).json(response.error)
    } catch (error) {
        console.log(error)
        return res.status(400).json('Erro ao alterar a tabela!')
    }
});

router.delete('/categorys/:id', authMiddleware, async function (req, res){
    try {
        const response = await categoryService.deletecategory(req.params.id);
        if (response.status == 200)        
            return res.status(response.status).json(response.success)
        return res.status(response.status).json(response.error)
    } catch (error) {
        console.log(error)
        return res.status(400).json('Erro ao deletar tabela!')
    }
});

module.exports = router;