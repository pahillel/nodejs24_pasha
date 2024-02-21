const fs = require('fs/promises');
const path = require('path');

class UsersService {
  constructor() {
    this.dbPath = path.join(process.cwd(), 'db.json');
    this.users = [];

    this.initializeDatabase();
  }

  async initializeDatabase() {
    try {
      await fs.access(this.dbPath);
      await this.loadUsersFromDB();
    } catch (error) {
      await this.createEmptyDBFile();
    }
  }

  async createEmptyDBFile() {
    try {
      await fs.writeFile(this.dbPath, '[]');
    } catch (error) {
      console.error('Create DB error:', error);
    }
  }

  async loadUsersFromDB() {
    try {
      const data = await fs.readFile(this.dbPath, 'utf-8');
      this.users = JSON.parse(data);
    } catch (error) {
      console.error('Error while loading users from DB:', error);
    }
  }

  async saveUsersToDB() {
    try {
      await fs.writeFile(this.dbPath, JSON.stringify(this.users, null, 2));
      console.log('Saved users to DB:', this.users);
    } catch (error) {
      console.error('Error while saving users to DB:', error);
    }
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

    return this.users;
  }

  async deleteUserById(user_id) {
    // Страшно бо фільтр все одно відпрацює навіть якщо не було такого елемента, а на довжину массива завʼязуватись не хочеться
    const { users, deleted } = this.users.reduce(
      (acc, user) => {
        if (user.id === user_id) {
          acc.deleted = true;
        } else {
          acc.users.push(user);
        }

        return acc;
      },
      {
        users: [],
        deleted: false
      }
    );

    if (!deleted) {
      return null;
    }

    this.users = users;

    return this.users;
  }
}

const usersService = new UsersService();

module.exports = usersService;
