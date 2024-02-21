require('dotenv').config();
const path = require('path');
const config = require('config');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const express = require('express');
const apiModule = require('./api');
const userService = require('./api/users/users.service');

const PORT = Number(config.get('PORT'));

const app = express();

const accessLogStream = rfs.createStream('server-express.log', {
  interval: '1d',
  path: path.join(process.cwd(), 'logs')
});

app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));
app.use(express.json());
app.use(apiModule);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Щось таке собі, не подобається що потрібно імортити userService в цьому файлі
// краще б зберігати одразу при обробці реквестів
process.on('SIGINT', async () => {
  console.log('Server is shutting down');

  await userService.saveUsersToDB();

  process.exit(0);
});
