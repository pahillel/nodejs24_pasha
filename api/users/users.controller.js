const usersService = require('./users.service');
const { statusCodes, setError, response } = require('../constants');

const getUsers = async (req, res, next) => {
  try {
    const users = await usersService.getAllUsers();

    response(req, next, { status: statusCodes.OK, data: users });
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

    response(req, next, { status: statusCodes.OK, data: user });
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

    response(req, next, { status: statusCodes.CREATED, data: result });
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

    response(req, next, { status: statusCodes.DELETED, data: result });
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
