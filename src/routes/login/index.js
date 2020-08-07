const {Router} = require('express');

const router = Router();
const service = require('./service/index');

router.get('/login',service);

module.exports = router;