const fs = require('fs');
const path = require('path');
const { createDirectorySync } = require('./create-directory');

const LOGS_PATH = path.join(__dirname, '..', 'logs');
const INFO_LOG_PATH = path.join(LOGS_PATH, 'info.log');
const ERROR_LOG_PATH = path.join(LOGS_PATH, 'errors.log');

createDirectorySync(LOGS_PATH);

const _createWriteStream = (filePath) => {
  return fs
    .createWriteStream(filePath, { flags: 'a+' })
    .on('error', (error) => {
      console.error(`An error occurred: ${error}`);

      process.exit(1);
    });
};

const infoLogStream = _createWriteStream(INFO_LOG_PATH);
const errorLogStream = _createWriteStream(ERROR_LOG_PATH);

process.on('beforeExit', () => {
  infoLogStream.end();
  errorLogStream.end();
});

module.exports = {
  infoLogStream,
  errorLogStream
};
