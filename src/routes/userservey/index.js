const {Router} = require('express')

const router = Router()
const service = require('./service')

router.get('/userkeyword/:userId',service.getUserServey)
router.post('/userkeyword',service.addUserServey)
module.exports = router