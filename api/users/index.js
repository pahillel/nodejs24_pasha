const router = require('express').Router();
const { validate } = require('../middlewares');
const {
  getUsers,
  getUser,
  createUser,
  deleteUser
} = require('./users.controller');

const {
  createUserValidation,
  userByIdValidation
} = require('./users.validation');

/**
 * @api {get} /users Get all users
 */
router.get('/', getUsers);

/**
 * @api {get} /users/:user_id Get user by id
 */
router.get('/:user_id', validate(userByIdValidation), getUser);

/**
 * @api {post} /users Create new user
 */
router.post('/', validate(createUserValidation), createUser);

/**
 * @api {delete} /users/:user_id Delete user by id
 */
router.delete('/:user_id', validate(userByIdValidation), deleteUser);

module.exports = router;
