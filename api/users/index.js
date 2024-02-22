const router = require('express').Router();
const { validate, respond } = require('../middlewares');
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
router.get('/', getUsers, respond);

/**
 * @api {get} /users/:user_id Get user by id
 */
router.get('/:user_id', validate(userByIdValidation), getUser, respond);

/**
 * @api {post} /users Create new user
 */
router.post('/', validate(createUserValidation), createUser, respond);

/**
 * @api {delete} /users/:user_id Delete user by id
 */
router.delete('/:user_id', validate(userByIdValidation), deleteUser, respond);

module.exports = router;
