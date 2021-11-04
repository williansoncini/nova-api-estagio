const { response } = require('express');
const express = require('express');
const router = express.Router();
const columnService = require('../../service/table/system/columnSystemService');
const { authMiddleware } = require('../../service/user/authService')
const columnInformationService = require('../../service/table/data/columnInformationService')

router.post('/columns/', authMiddleware, async function (req, res) {
    const data = req.body;
    try {
        const response = await columnService.createColumns(data)
        if (response.error)
            return res.status(response.status).json(response.error)
        // return res.status(response.status).json({ 'success': response.success })
    } catch (error) {
        console.log(error)
        return res.status(400).json('Falha ao criar tabela')
    }

    try {
        const responseInfomartion = await columnInformationService.createColumns(data)
        if (responseInfomartion.error)
            return res.status(responseInfomartion.status).json(responseInfomartion.error)
        return res.status(responseInfomartion.status).json(responseInfomartion.success)
    } catch (error) {
        console.log(error)
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

router.put('/columns', authMiddleware, async function (req, res) {
    const data = req.body;
    try {
        const response = await columnInformationService.updateColumns(data)
        if (response.error != null)
            return res.status(response.status).json(response.error)
    } catch (error) {
        console.log(error)
        return res.status(400).json('Falha ao alterar a tabela!')
    }

    try {
        const response = await columnService.updateColumns(data);
        if (response.status != 200)
            return res.status(response.status).json(response.error)
        return res.status(response.status).json(response.success)
    } catch (error) {
        console.log(error)
        return res.status(400).json('Falha ao alterar a tabela!')
    }
})

router.delete('/columns/:id', authMiddleware, async function (req, res) {
    const id = (req.params.id);
    try {
        const response = await columnInformationService.deleteColumn(id)
        if (response.error != null)
            return res.status(response.status).json(response.error)
    } catch (error) {
        return res.status(400).json('Falha ao deletar a tabela no banco de dados de informações!')
    }

    try {
        const response = await columnService.deleteColumn(id);
        if (response.error != null)
            return res.status(response.status).json(response.error)
        return res.status(response.status).json(response.success)
    } catch (error) {
        return res.status(400).json('Falha ao deletar a tabela no banco de dados!')
    }
});
// falta realizar a mudanca para o campo desativo
module.exports = router;
