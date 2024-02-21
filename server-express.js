require('dotenv').config();
const config = require('config');
const logger = require('morgan');
const express = require('express');
const apiModule = require('./api');

const PORT = Number(config.get('PORT'));

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use(apiModule);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('beforeExit', () => {
  // TODO: close database connection and save data
});
