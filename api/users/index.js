const router = require('express').Router();

router.get('/');

router.get('/:user_id');

router.post('/');

router.delete('/:user_id');

module.exports = router;
