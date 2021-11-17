const express = require('express');
const { insertDataIntoTable, getDataFromTable } = require('../../service/table/dataTableService');
const router = express.Router();
const { authMiddleware } = require('../../service/user/authService')

router.post('/tables/:id/data'/*, authMiddleware,*/, async function (req, res) {
    const id = req.params.id;
    const data = req.body;
    try {
        const response = await insertDataIntoTable(id,data)
        if (response.status == 200){
            return res.status(response.status).json(response.success)
        }else{
            return res.status(response.status).json(response.error)
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json('Erro ao importar dados')
    }
});

router.get('/tables/:id/data'/*, authMiddleware,*/, async function (req, res) {
    const id = req.params.id;
    try {
        const response = await getDataFromTable(id)
        if (response.status == 200){
            return res.status(response.status).json({'success': response.success, 'data':response.data})
        }else{
            return res.status(response.status).json(response.error)
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json('Erro ao importar dados')
    }
});

module.exports = router;