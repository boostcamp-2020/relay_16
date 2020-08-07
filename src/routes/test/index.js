const {Router} = require('express')

const router = Router()
const service = require('./service')

router.get('/test',service.getTest)

module.exports = router