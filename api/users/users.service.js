const { database } = require('../../database');

class UsersService {
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

  async getUserById(user_id) {
    const user = this.users.find((user) => user.id === user_id);

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

  async deleteUserById(user_id) {
    const userIndex = this.users.findIndex((user) => user.id === user_id);

    if (userIndex === -1) {
      return false;
    }

    this.users.splice(userIndex, 1);
    return true;
  }
}

const usersService = new UsersService(database);

module.exports = usersService;
