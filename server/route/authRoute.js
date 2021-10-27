const router = express.Router();
const authService = require('../service/user/authService')

router.post('/checkToken', async function (req, res){
    return authService.checkToken(req,res)
});

module.exports = router;