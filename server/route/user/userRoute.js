const express = require('express');
const router = express.Router();
const userService = require('../../service/user/userService')
const {authMiddleware} = require('../../service/user/authService')

router.get('/users', authMiddleware, async function (req, res){
    const users = await userService.getUsers();
    return res.json(users);
});

router.get('/users/:id', authMiddleware, async function (req, res){
    const user = await userService.getUser(req.params.id);
    return res.json(user);
});

router.post('/users', async function (req, res){
    try {
        const user = req.body;
        if (user == {})
            return res.status(400).json({'error':'Dados vazios'})
        const response = await userService.saveUser(user);
        if (response.status !== 200)
            return res.status(response.status).json({'error': response.error})
        return res.status(response.status).json({'success':response.success, 'data':response.data})
    } catch (error) {
        console.log(error)
        return res.status(400).json({'error':'Falha ao cadastrar usuário!'})
    }
});

router.put('/users/:id', authMiddleware, async function (req, res){
    const data = req.body;
    const response = await userService.updateUser(req.params.id,data);
    res.json(response);
});

router.delete('/users/:id', authMiddleware, async function (req, res){
    const response = await userService.deleteUser(req.params.id);
    res.json(response);
});

router.get('/users/mail/:email', authMiddleware,async function (req, res){
    const user = await userService.getUserByEmail(req.params.email);
    return res.json(user);
});

module.exports = router;