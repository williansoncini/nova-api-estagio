const express = require('express');
const router = express.Router();
const loginService = require('../../service/user/loginService')

router.post('/login', async function (req, res){
    console.log('aqui')
    const [hashType, hash] = req.headers.authorization.split(" ")
    const credentials = Buffer.from(hash, 'base64').toString()
    const [email, pass] = credentials.split(":")
    try {
        const user = await loginService.login({
            email:email,
            senha:pass
        });
        if (user.token != null)
            return res.status(200).json({
                'sucess':'Login efetuado!',
                user
            })
        else 
            return res.status(404).json({'error':'Dados invalidos para login!'})
    } catch (error) {
        return res.status(400).json({'error':'Erro ao efetuar login!'})
    }
    

    return res.json(menssage);
});

module.exports = router;