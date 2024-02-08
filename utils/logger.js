const colors = require('colors');
const config = require('config');
const fs = require('fs');
const path = require('path');

const logLevel = config.get('LOG_LEVEL');
const LOGS_PATH = path.join(__dirname, '..', 'logs');
const INFO_LOG_PATH = path.join(LOGS_PATH, 'info.log');
const ERROR_LOG_PATH = path.join(LOGS_PATH, 'errors.log');

if (!fs.existsSync(LOGS_PATH)) {
  fs.mkdirSync(LOGS_PATH);
}

if (Number(config.get('COLORS_ENABLED')) === 0) {
  colors.disable();
}

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

const _getLogMessage = (name, ...payload) => {
  const time = new Date().toISOString();

  return `[${time}][${name}]: ${payload.join(' ')}\n`;
};

const _logHandlerFactory = (logFn, colorFn, stream, name) => {
  return (...payload) => {
    const message = _getLogMessage(`${name}:`, ...payload);

    logFn(colorFn(name), ...payload);
    stream.write(message);
  };
};

function logger(name) {
  const noop = () => {};
  const info = logLevel === 'info' ? console.log : noop;
  const warn = ['info', 'warn'].includes(logLevel) ? console.warn : noop;

  return {
    info: _logHandlerFactory(info, colors.green, infoLogStream, name),
    warn: _logHandlerFactory(warn, colors.yellow, errorLogStream, name),
    error: _logHandlerFactory(console.error, colors.red, errorLogStream, name)
  };
}

process.on('beforeExit', () => {
  infoLogStream.end();
  errorLogStream.end();
});

module.exports = logger;
