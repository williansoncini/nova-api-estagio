const express = require('express');
const router = express.Router();
const typeColumnService = require('../../service/table/typeColumnService')
const {authMiddleware} = require('../../service/user/authService')

router.get('/typeColumns', authMiddleware ,async function (req, res){
    try {
        const response = await typeColumnService.gettypeColumns();
        if (response.status !== 200)
            return res.status(response.status).json(response.error)
        return res.status(response.status).json({'success':response.success, 'data':response.data})
    } catch (error) {
        return res.status(400).json('Falha ao consultar tipos de colunas!')        
    }
});

router.get('/typeColumns/:id', authMiddleware, async function (req, res){
    const typeColumn = await typeColumnService.gettypeColumn(req.params.id);
    return res.json(typeColumn);
});

router.post('/typeColumns', authMiddleware, async function (req, res){
    const typeColumn = req.body;
    const response = await typeColumnService.savetypeColumn(typeColumn);
    res.json(response);
});

router.put('/typeColumns/:id', authMiddleware, async function (req, res){
    const data = req.body;
    await typeColumnService.updatetypeColumn(req.params.id,data);
    res.end();
});

router.delete('/typeColumns/:id', authMiddleware, async function (req, res){
    const response = await typeColumnService.deletetypeColumn(req.params.id);
    res.json(response);
});

module.exports = router;