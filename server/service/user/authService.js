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

exports.getUserFromToken = async function(authorization){
    try {
        const token = authorization.split(' ')[1]
        let decoded
        try {
            decoded = jwt.verify(token)
        } catch (error) {
            return false
        }
        const userId = decoded.user
        const user = userService.getUser(userId)
        return user
    } catch (error) {
        console.log(error)
        return false
    }
}
