const usersService = require('./users.service');
const { statusCodes, setError } = require('../constants');
const { response } = require('../middlewares');

const getUsers = async (req, res, next) => {
  try {
    const users = await usersService.getAllUsers();

    if (!users) {
      throw setError('Users not found', statusCodes.INTERNAL_SERVER_ERROR);
    }

    response(res, statusCodes.OK, users);
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

    response(res, statusCodes.OK, user);
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

    response(res, statusCodes.CREATED, result);
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

    response(res, statusCodes.DELETED, result);
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
