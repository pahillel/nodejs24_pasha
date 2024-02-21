const router = require('express').Router();
const userModule = require('./users');

router.use('/users', userModule);

module.exports = router;
