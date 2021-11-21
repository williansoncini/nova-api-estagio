const express = require('express');
const router = express.Router();
const departamentService = require('../../service/user/departamentService')
const { authMiddleware } = require('../../service/user/authService')

router.get('/departaments', authMiddleware, async function (req, res) {
    try {
        const response = await departamentService.getdepartaments();
        if (response.status == 200)
            return res.status(response.status).json({ 'success': response.success, 'data': response.data })
        return res.status(response.status).json(response.error)
    } catch (error) {
        return res.status(400).json('Erro ao consultar os departamentos!')
    }
});

router.get('/departaments/:id', authMiddleware, async function (req, res) {
    try {
        const id = req.params.id
        const response = await departamentService.getdepartament(id);
        if (response.status == 200)
            return res.status(response.status).json({ 'success': response.success, 'data': response.data })
        return res.status(response.status).json(response.error)
    } catch (error) {
        return res.status(400).json('Erro ao consultar o departamento!')
    }
});

router.post('/departaments', async function (req, res) {
    try {
        const departament = req.body;
        const response = await departamentService.savedepartament(departament);
        if (response.status == 200)
            return res.status(response.status).json({ 'success': response.success, 'data': response.data })
        return res.status(response.status).json(response.error)
    } catch (error) {
        return res.status(400).json('Erro ao cadastrar o departamento!')
    }
});

router.put('/departaments/:id', authMiddleware, async function (req, res) {
    try {
        const id = req.params.id
        const departament = req.body;
        const response = await departamentService.updatedepartament(id, departament);
        if (response.status == 200)
            return res.status(response.status).json(response.success)
        return res.status(response.status).json(response.error)
    } catch (error) {
        return res.status(400).json('Erro ao alterar o departamento!')
    }
});

router.delete('/departaments/:id', authMiddleware, async function (req, res) {
    try {
        const id = req.params.id
        const response = await departamentService.deletedepartament(id);
        if (response.status == 200)        
            return res.status(response.status).json(response.success)
        return res.status(response.status).json(response.error)
    } catch (error) {
        console.log(error)
        return res.status(400).json('Erro ao deletar departamento!')
    }
});

module.exports = router;