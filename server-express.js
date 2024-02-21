require('dotenv').config();
const config = require('config');
const morgan = require('morgan');
const express = require('express');
const apiModule = require('./api');
const userService = require('./api/users/users.service');

const PORT = Number(config.get('PORT'));

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(apiModule);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Щось таке собі, не подобається що потрібно імортити userService в цьому файлі
process.on('SIGINT', async () => {
  console.log('Server is shutting down');

  await userService.saveUsersToDB();

  process.exit(0);
});
