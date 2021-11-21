const express = require('express');
const router = express.Router();
const tableSystemService = require('../../service/table/system/tableSystemService')
const tableInformationService = require('../../service/table/data/tableInformationService')
const { authMiddleware, getUserFromToken } = require('../../service/user/authService')

router.post('/tables/', authMiddleware, async function (req, res) {
    try {
        const data = req.body;
        data.nome = data.nome.trim()

        const user = await getUserFromToken(req.headers.authorization)
        const valueUser = `${user.id} - ${user.nome}`

        const responseInformation = await tableInformationService.createTable(data)
        if (responseInformation.status !== 200)
            return res.status(responseInformation.status).json(responseInformation.error);

        const responseSystem = await tableSystemService.saveTable(data, valueUser)
        if (responseSystem.status !== 200)
            return res.status(responseSystem.status).json(responseSystem.error);
        return res.status(responseSystem.status).json({ 'success': responseSystem.success, 'data': responseSystem.data })
    } catch (error) {
        console.log(error)
        return res.status(400).json('Falha ao salvar a tabela!')
    }
});

router.put('/tables/:id', authMiddleware, async function (req, res) {
    const id = req.params.id;
    const data = req.body;
    data.nome = data.nome.trim()

    const user = await getUserFromToken(req.headers.authorization)
    const valueUser = `${user.id} - ${user.nome}`

    let responseSystem = {}
    try {
        responseSystem = await tableSystemService.alterTable(id, data, valueUser)
        if (responseSystem.status == 304)
            return res.status(responseSystem.status).json(responseSystem.success)
        else if (responseSystem.status != 200)
            return res.status(responseSystem.status).json(responseSystem.error)
    } catch (error) {
        return { 'status': 400, 'error': 'Falha ao alterar a tabela!' }
    }

    let responseInformation = {}
    try {
        let oldTableName = responseSystem.data.oldTableName
        responseInformation = await tableInformationService.alterTable(data, oldTableName)
        if (responseInformation.error)
            return res.status(responseInformation.status).json(responseInformation.error)
        return res.status(responseInformation.status).json(responseSystem.success)
    } catch (error) {
        console.log(error)
        return { 'status': 400, 'error': 'Falha ao alterar a tabela!' }
    }
});

router.delete('/tables/:id', authMiddleware, async function (req, res) {
    const id = req.params.id;
    const user = await getUserFromToken(req.headers.authorization)
    const valueUser = `${user.id} - ${user.nome}`

    let tableName = ''
    const responseSystem = await tableSystemService.deleteTable(id, valueUser)
    if (responseSystem.error != null)
        return res.status(responseSystem.status).json(responseSystem.error)

    tableName = responseSystem.tableName
    const responseInformation = tableInformationService.deleteTableByName(tableName)
    if (responseInformation.error != null)
        return res.status(responseInformation.status).json(responseInformation.error)
    return res.status(200).json(`A tabela '${tableName}' foi deletada com sucesso!`)
})

router.get('/tables/:id', authMiddleware, async function (req, res) {
    const id = req.params.id;
    let response = {}
    try {
        response = await tableSystemService.findTableById(id);
        if (response.status != 200)
            return res.status(response.status).json({ 'error': response.error })
        else
            return res.status(response.status).json({ 'success': response.success, 'data': response.data })
    } catch (error) {
        return res.status(400).json({ 'error': 'Falha ao consultar tabela' })
    }
})

router.get('/tables/', authMiddleware, async function (req, res) {
    const response = await tableSystemService.geTables();
    if (response.error != null)
        return res.status(response.status).json(response.error)

    const tables = response.tables
    if (tables == [])
        return res.status(response.status).json('Não existem tabelas')
    return res.status(response.status).json({
        'success': response.success,
        'tables': tables
    })
})

router.get('/logs/tables/', authMiddleware, async function (req, res) {
    try {
        const response = await tableSystemService.getLogTables()
        if (response.status == 200)
            return res.status(200).json({ 'success': response.success, 'data': response.data })
        else
            return res.status(response.status).json(response.error)
    } catch (error) {
        return res.status(400).json('Erro ao coletar logs da tabela!')
    }
})

module.exports = router;