const express = require('express');
const router = express.Router();
const loginService = require('../../service/user/loginService')

router.post('/login', async function (req, res){
    const [hashType, hash] = req.headers.authorization.split(" ")
    const credentials = Buffer.from(hash, 'base64').toString()
    const [email, pass] = credentials.split(":")
    try {
        const response = await loginService.login(email,pass);
        if (response.status != 200)
            return res.status(response.status).json({'error':response.error})
        return res.status(response.status).json({'success':response.success,'data':response.data})
    } catch (error) {
        return res.status(400).json({'error':'Erro ao efetuar login!'})
    }
});

module.exports = router;