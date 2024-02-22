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

    return newUser;
  }

  async deleteUserById(user_id) {
    /*
     * Можна і без фільтра :) Чому так краще?
     * 1. reduce завжди обробляє весь масив до кінця, findIndex зупиниться як тільки знайде співпадіння. В більшості випадків це буде швидше
     * 2. ми не повертаємо ВЕСЬ список юзерів якщо ОДИН був видалений, в цьому немає сенсу. Достатньо 204 No Content, це типова відповідь на таке.
     *    Ну або 200 OK без resp body - теж нормально буде. А там консюмер нашої апішки сам рішає як поступити - рефетчити оновлений список чи ні
     */
    const userIndex = this.users.findIndex((user) => user.id === user_id);
    if (!userIndex) {
      return null;
    }

    this.users.splice(userIndex, 1);
    return true;
  }
}

const usersService = new UsersService();

module.exports = usersService;
