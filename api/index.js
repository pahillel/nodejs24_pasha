const router = require('express').Router();
const { respond } = require('./middlewares');
const userModule = require('./users');

router.use('/users', userModule);

router.use((err, req, res, next) => {
  if (err.type === 'API_ERROR') {
    req._apiResponse = { status: err.status, data: { error: err.message } };
  }

  return next();
}, respond);

module.exports = router;
