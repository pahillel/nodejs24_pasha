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

router.use((err, req, res, next) => {
  // API errors краще повертати так само джсоном або текстом - просто якщо ендпоінт повертає або HTML або JSON,
  // це буде сильно конф'юзити. Бо якщо звертаємось сюда з іншого бекенда - нащо нам той HTML? парсити на еррор код? ))
  // Тому будемо повертати так само як із валідейшен мідлвера - щоб було загальне консістенсі :thumbs_up
  if (err.type === 'UserApi') {
    req._apiResponse = { status: err.status, data: { error: err.message } };
  }

  return next();
}, respond)

module.exports = router;
