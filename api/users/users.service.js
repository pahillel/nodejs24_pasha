require('dotenv').config();
const config = require('config');

const DB = config.get('DB');

const serviceFactory = (key) => {
  switch (key) {
    case 'json':
      return require('./classes/users-local-db.service');

    case 'sqlite':
      return require('./classes/users-sqlite-db.service');

    default:
      break;
  }
};

module.exports = serviceFactory(DB);
