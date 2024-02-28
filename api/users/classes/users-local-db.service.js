const { database } = require('../../../database');

class UsersLocalDBService {
  get users() {
    return this._database.users;
  }

  set users(users) {
    this._database.users = users;
  }

  constructor(database) {
    this._database = database;
  }

  async getAllUsers() {
    return this.users;
  }

  async getUserById(userId) {
    const user = this.users.find((user) => user.id === userId);

    return user;
  }

  async createNewUser(dto) {
    const newUser = {
      ...dto,
      id: Date.now()
    };

    this.users.push(newUser);

    return newUser;
  }

  async deleteUserById(userId) {
    const userIndex = this.users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return false;
    }

    this.users.splice(userIndex, 1);
    return true;
  }
}

const service = new UsersLocalDBService(database);

module.exports = service;
