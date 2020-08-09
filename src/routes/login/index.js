const {Router} = require('express');

const router = Router();
const service = require('./service/index');

router.use('/login',service);

module.exports = router;