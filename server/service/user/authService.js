const jwt = require('../../infra/provider/jwt')
const userService = require('../user/userService')

exports.authMiddleware = async function(req,res,next){
        try {
            console.log(req.headers)
            const [hashType, token] = req.headers.authorization.split(" ")
            const payload = await jwt.verify(token)
            console.log(payload)
            next()
        } catch (error) {
            return res.status(401).send(error)
        }
}

// exports.checkToken = async function(req,res){
//     try {
//         const [hashType, token] = req.headers.authorization.split(" ")
//         const payload = await jwt.verify(token)
//         console.log(payload)
//     } catch (error) {
//         return res.status(401).send(error)
//     }
// }