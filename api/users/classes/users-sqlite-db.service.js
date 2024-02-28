let knexLib = require('knex');
const knexConfig = require('../../../knexfile');
const { setError, statusCodes } = require('../../constants');

class UsersSQLiteDBService {
  constructor() {
    this._knex = knexLib(knexConfig);
  }

  async getAllUsers() {
    const result = await this._getTable().select('*');

    return result;
  }

  async getUserById(userId) {
    const [result] = await this._getTable().where('id', userId);

    return result;
  }

  async createNewUser(dto) {
    try {
      const [result] = await this._getTable().insert(dto).returning('*');

      return result;
    } catch (error) {
      return false;
    }
  }

  async deleteUserById(userId) {
    const result = await this._getTable().where('id', userId).del();

    return !!result;
  }

  _getTable() {
    return this._knex('users');
  }
}

const service = new UsersSQLiteDBService();

module.exports = service;
