const express = require('express');
const router = express.Router();
// const userService = require('../service/userService')
const loginService = require('../service/loginService')

router.post('/login', async function (req, res){
    const data = req.body;
    // console.log('Passando pela rota de Login')
    const menssage = await loginService.login(data);
    // console.log('mensagem:',menssage)
    return res.json(menssage);
});

module.exports = router;