const { response } = require('express');
const express = require('express');
const router = express.Router();
const columnService = require('../../service/table/system/columnSystemService');
const { authMiddleware } = require('../../service/user/authService')

router.post('/columns/', authMiddleware, async function (req, res) {
    const data = req.body;
    try {
        const response = await columnService.createColumns(data)
        if (response.error)
            return res.status(response.status).json(response.error)
        return res.status(response.status).json({ 'success': response.success, 'data': response.data })
    } catch (error) {
        return res.status(400).json('Falha ao criar tabela')
    }
})

router.get('/columns/', authMiddleware, async function (req, res) {
    const data = await columnService.getAllColumns();
    return res.json(data)
})

router.get('/columns/:id', authMiddleware, async function (req, res) {
    const id = req.params.id;
    const data = await columnService.getColumnById(id);
    return res.json(data);
})

router.get('/columns/tables/:id', authMiddleware, async function (req, res) {
    const id = req.params.id;
    const data = await columnService.getColumnByIdTable(id);
    return res.json(data);
})

router.put('/columns/:id', authMiddleware, async function (req, res) {
    const id = req.params.id;
    const data = req.body;
    const response = await columnService.updateColumn(id, data);
    return res.json(response)
})

router.delete('/columns/:id', authMiddleware, async function (req, res) {
    const response = await columnService.deleteColumn(req.params.id);
    res.json(response);
});
// falta realizar a mudanca para o campo desativo
module.exports = router;
