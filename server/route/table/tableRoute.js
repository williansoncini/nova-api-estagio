const express = require('express');
const router = express.Router();
const tableSystemService = require('../../service/table/system/tableSystemService')
const tableInformationService = require('../../service/table/data/tableInformationService')
const { authMiddleware } = require('../../service/user/authService')

router.post('/tables/', authMiddleware, async function (req, res) {
    const data = req.body;
    let responseInformation = {}
    responseInformation = await tableInformationService.createTable(data)
    if (responseInformation.status !== 200)
        return res.status(responseInformation.status).json(responseInformation.error);

    const responseSystem = await tableSystemService.saveTable(data)
    if (responseSystem.status !== 200)
        return res.status(responseSystem.status).json(responseSystem.error);
    return res.status(responseSystem.status).json({ 'success': responseSystem.success, 'data': responseSystem.data })
});

router.put('/tables/:id', authMiddleware, async function (req, res) {
    const id = req.params.id;
    const data = req.body;

    let responseSystem = {}
    try {
        responseSystem = await tableSystemService.alterTable(id, data)
        if (responseSystem.status != 200)
            return res.status(responseSystem.status).json(responseSystem.error)
        else if (responseSystem.status == 304)
            return res.status(responseSystem.status).json(responseSystem.success)
    } catch (error) {
        console.log(error)
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
    const responseSystem = await tableSystemService.deleteTable(id)

    let tableName = ''
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

module.exports = router;