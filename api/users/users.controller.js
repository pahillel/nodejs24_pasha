const usersService = require('./users.service');

const getUsers = async (req, res, next) => {
  try {
    const users = await usersService.getUsers();

    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
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
