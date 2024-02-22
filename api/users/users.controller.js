const usersService = require('./users.service');
const { statusCodes, setError } = require('../constants');

const getUsers = async (req, res, next) => {
  try {
    const users = await usersService.getAllUsers();

    // по факту, це не помилка - якщо юзерів ще немає, повернемо пустий масив.
    // 404 було б якщо ендпоінта немає, наприклад. Але точно не сервер еррор

    req._apiResponse = { status: statusCodes.OK, data: users };
    next();
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const userId = req.params.user_id;

    const user = await usersService.getUserById(userId);

    if (!user) {
      throw setError('User not found', statusCodes.NOT_FOUND);
    }

    req._apiResponse = { status: statusCodes.OK, data: user };
    next();
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const result = await usersService.createNewUser(req.body);

    if (!result) {
      throw setError('User not created', statusCodes.INTERNAL_SERVER_ERROR);
    }

    req._apiResponse = { status: statusCodes.CREATED, data: result };
    next();
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const result = await usersService.deleteUserById(req.params.user_id);

    if (!result) {
      throw setError('User not deleted', statusCodes.NOT_FOUND);
    }

    req._apiResponse = { status: statusCodes.DELETED, result };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser
};
