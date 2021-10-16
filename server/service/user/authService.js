const jwt = require('../../infra/provider/jwt')
const userService = require('../user/userService')

exports.authMiddleware = async function(req,res,next){
        try {
            const [hashType, token] = req.headers.authorization.split(" ")
            const payload = await jwt.verify(token)
            next()
        } catch (error) {
            return res.status(401).send(error)
        }
}