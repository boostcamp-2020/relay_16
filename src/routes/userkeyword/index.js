const {Router} = require('express')

const router = Router()
const service = require('./service')

router.get('/userkeyword/:userId',service.getUserkeywords)
router.post('/userkeyword',service.addUserkeyword)
module.exports = router