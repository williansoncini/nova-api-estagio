const jwt = require('../infra/jwt')
const userService = require('../service/userService')

exports.authMiddleware = async function(req,res,next){
        try {
            const [hashType, token] = req.headers.authorization.split(" ")
            const payload = await jwt.verify(token)
            next()
        } catch (error) {
            return res.status(401).send(error)
        }
}