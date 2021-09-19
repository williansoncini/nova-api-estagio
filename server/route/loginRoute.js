const express = require('express');
const router = express.Router();
// const userService = require('../service/userService')
const loginService = require('../service/loginService')
const jwt = require('../infra/jwt')

router.post('/login', async function (req, res){
    const [hashType, hash] = req.headers.authorization.split(" ")
    const credentials = Buffer.from(hash, 'base64').toString()
    const [email, pass] = credentials.split(":")
    const menssage = await loginService.login({
        email:email,
        senha:pass
    });
    return res.json(menssage);
});

module.exports = router;