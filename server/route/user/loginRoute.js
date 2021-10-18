const express = require('express');
const router = express.Router();
const loginService = require('../../service/user/loginService')

router.post('/login', async function (req, res){
    console.log('aqui')
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