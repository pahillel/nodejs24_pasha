const path = require('path');
const fs = require('fs/promises');

class Database {
  get users() {
    return this._data.users || [];
  }

  set users(value) {
    this._data.users = value;
  }

  constructor() {
    this.dbPath = path.join(process.cwd(), 'db.json');
    this._data = { users: [] };

    this.initializeDB();
  }

  async initializeDB() {
    try {
      await fs.access(this.dbPath);
      await this.loadDB();
    } catch (error) {
      await this.createDB();
    }
  }

  async createDB() {
    try {
      await fs.writeFile(this.dbPath, JSON.stringify(this._data));
    } catch (error) {
      console.error('Create DB error:', error);
    }
  }

  async loadDB() {
    try {
      const data = await fs.readFile(this.dbPath, 'utf-8');
      this._data = JSON.parse(data);
    } catch (error) {
      console.error('Error while loading DB:', error);
    }
  }

  async saveDB() {
    try {
      await fs.writeFile(this.dbPath, JSON.stringify(this._data, null, 2));
      console.log('Saved to DB:', this._data);
    } catch (error) {
      console.error('Error while saving DB:', error);
    }
  }
}

const database = new Database();

module.exports = {
  database
};
