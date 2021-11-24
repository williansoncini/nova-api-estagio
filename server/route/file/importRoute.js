const express = require('express');
const router = express.Router();
const importCsvService = require('../../service/file/importCsvService')
const importService = require('../../service/file/importService');
const { authMiddleware, getUserFromToken } = require('../../service/user/authService');

router.post('/import/table'/*, authMiddleware*/, async function (req, res) {
    const data = req.body;
    try {
        const response = await importService.importXlsxIntoTable(data)
        if (response.status != 200) {
            return res.status(response.status).json(response.error)
        }
        return res.status(response.status).json({ 'success': response.success, 'tabela_id': response.tabela_id })
    } catch (error) {
        console.log(error)
        return res.status(400).json('Erro ao tentar importar dados!')
    }
});

// Responsavel por criar a tabela automaticamente
router.post('/import/create', authMiddleware, async function (req, res) {
    try {
        console.log('aqui')
        let data = req.body;
        const user = await getUserFromToken(req.headers.authorization)
        const valueUser = `${user.id} - ${user.nome}`
        try {
            const response = await importService.importXlsxAndCreateTable(data, valueUser)
            if (response.status != 200) {
                return res.status(response.status).json(response.error)
            }
            return res.status(response.status).json({ 'success': response.success, 'tabela_id': response.tabela_id })
        } catch (error) {
            return res.status(400).json('Erro ao tentar importar dados!')
        }
    } catch (error) {
        return res.status(400).json('Erro ao importar dados')
    }
});

router.post('/import/create/new', authMiddleware, async function (req, res) {
    try {
        let data = req.body;
        const user = await getUserFromToken(req.headers.authorization)
        const valueUser = `${user.id} - ${user.nome}`
        try {
            const response = await importService.importXlsxAndCreateTable(data, valueUser)
            if (response.status != 200) {
                return res.status(response.status).json(response.error)
            }
            return res.status(response.status).json({ 'success': response.success, 'tabela_id': response.tabela_id })
        } catch (error) {
            return res.status(400).json('Erro ao tentar importar dados!')
        }
    } catch (error) {
        return res.status(400).json('Erro ao importar dados')
    }
});

module.exports = router;