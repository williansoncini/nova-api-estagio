const express = require('express');
const router = express.Router();
const tableSystemService = require('../../service/table/system/tableSystemService')
const tableInformationService = require('../../service/table/data/tableInformationService')
const {authMiddleware} = require('../../service/user/authService')

router.post('/tables/', authMiddleware, async function (req, res){
    const data = req.body;
    let responseInformation = {}
    responseInformation = await tableInformationService.createTable(data)

    if (responseInformation.status == 400)
        return res.status(responseInformation.status).json(responseInformation.error);
    else{
        const responseSystem = await tableSystemService.saveTable(data)
        if (responseSystem.status == 400){
            return res.status(responseSystem.status).json(responseSystem.error);
        }else{
            return res.status(responseSystem.status).json(responseSystem.sucess)
        }
    }
});

router.put('/tables/:id', authMiddleware, async function(req, res){
    const id = req.params.id;
    const data = req.body;

    let responseSystem = {}
    let oldTableName = ''
    try {
        responseSystem = await tableSystemService.alterTable(id, data)
        if (responseSystem.error != null)
            return res.status(responseSystem.status).json(responseSystem.error) 
        } catch (error) {
            return {'status':400,'error':'Falha ao alterar a tabela!'}
        }
        
    oldTableName = responseSystem.oldTableName
    let responseInformation = {}
    try {
        responseInformation = await tableInformationService.alterTable(data, oldTableName)
        if (responseSystem.error != null)
            return res.status(responseInformation.status).json(responseInformation.error) 
    } catch (error) {
        return {'status':400,'error':'Falha ao alterar a tabela!'}
    }

    return {'status':200,'sucess':`A tabela '${oldTableName}' foi alterada com sucesso!`}
});

router.delete('/tables/:id', authMiddleware, async function(req, res){
    const id = req.params.id;
    const responseSystem = await tableSystemService.deleteTable(id)
    
    let tableName = ''
    if (responseSystem.error != null)
        return res.status(responseSystem.status).json(responseSystem.error)
        // else
        // return res.status(responseSystem.status).json(responseSystem.sucess)
        
        tableName = responseSystem.tableName
        const responseInformation = tableInformationService.deleteTableByName(tableName)
    if (responseInformation.error != null)
        return res.status(responseInformation.status).json(responseInformation.error)
        
        return res.status(200).json(`A tabela '${tableName}' foi deletada com sucesso!`)
    })

router.get('/tables/:id', authMiddleware, async function(req, res){
    const id = req.params.id;
    const responseSystem = await tableSystemService.findTableById(id);
    if (responseSystem.error != null)
        return res.status(responseSystem.status).json(responseSystem.error)
    const table = responseSystem.table
    // Pegar a tabela pelo banco de dados de informações
    const responseInformation = await tableInformationService.getTableAndColumnFromId(table)
    if (responseInformation.error != null)
        return res.status(responseInformation.status).json(responseInformation.error)

    return res.status(200).json(responseInformation)
})

router.get('/tables/', authMiddleware, async function(req, res){
    //consultar todos os nomes no banco de dadoas do sistema
    const responseSystem = await tableSystemService.getActiveTables();
    if (responseSystem.erro != null)
        return res.status(responseSystem.status).json(responseSystem.error) 
    
    const tables = responseSystem.tables
    if (tables.length == 0)
        return res.status(responseSystem.status).json(responseSystem.error) 

    const responseInformation = await tableInformationService.getTablesAndColummns(tables);

    if (responseInformation.error != null)
        return res.status(responseInformation.status).json(responseInformation.error) 

    if (responseInformation.status == 200 && responseSystem.status == 200)
        return res.status(200).json({
            'sucess': responseInformation.sucess,
            'table': responseInformation.tables
        })
})

module.exports = router;