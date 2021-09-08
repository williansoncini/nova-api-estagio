const express = require('express');
const router = express.Router();
const userService = require('../service/userService')

router.get('/users', async function (req, res){
    const users = await userService.getUsers();
    return res.json(users);
});

router.get('/users/:id', async function (req, res){
    const user = await userService.getUser(req.params.id);
    return res.json(user);
});

router.post('/users', async function (req, res){
    const user = req.body;
    const response = await userService.saveUser(user);
    res.json(response);
});

router.put('/users/:id', async function (req, res){
    const data = req.body;
    await userService.updateUser(req.params.id,data);
    res.end();
});

router.delete('/users/:id', async function (req, res){
    await userService.deleteUser(req.params.id);
    res.end();
});

router.get('/users/:email', async function (req, res){
    const user = await userService.getUserByEmail(req.params.email);
    return res.json(user);
});

module.exports = router;