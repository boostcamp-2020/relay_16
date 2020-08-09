const {Router} = require('express')

const router = Router()
const service = require('./service')

router.get('/', (req, res) => console.log("connected to test") )
router.get('/user/:userId',service.getUser)
router.post('/user',service.addUser)
module.exports = router