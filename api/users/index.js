const router = require('express').Router();
const { validate } = require('../middlewares');
const {
  createUserValidation,
  userByIdValidation
} = require('./users.validation');
const {
  createUser,
  getUser,
  getUsers,
  deleteUser
} = require('./users.controller');

router.get('/', getUsers);

router.get('/:user_id', validate(userByIdValidation), getUser);

router.post('/', validate(createUserValidation), createUser);

router.delete('/:user_id', validate(userByIdValidation), deleteUser);

module.exports = router;
