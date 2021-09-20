const express = require('express');
const router = express.Router();
const userService = require('../service/userService')
const {authMiddleware} = require('../service/authService')

router.get('/users', authMiddleware ,async function (req, res){
    const users = await userService.getUsers();
    return res.json(users);
});

router.get('/users/:id', authMiddleware, async function (req, res){
    const user = await userService.getUser(req.params.id);
    return res.json(user);
});

router.post('/users', async function (req, res){
    const user = req.body;
    // console.log(user)
    const response = await userService.saveUser(user);
    // console.log(response)
    res.json(response);
});

router.put('/users/:id', authMiddleware, async function (req, res){
    const data = req.body;
    await userService.updateUser(req.params.id,data);
    res.end();
});

router.delete('/users/:id', authMiddleware, async function (req, res){
    await userService.deleteUser(req.params.id);
    res.end();
});

router.get('/users/mail/:email', authMiddleware,async function (req, res){
    const user = await userService.getUserByEmail(req.params.email);
    return res.json(user);
});

module.exports = router;