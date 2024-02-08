const colors = require('colors');
const config = require('config');
const fs = require('fs');
const path = require('path');

const logLevel = config.get('LOG_LEVEL');
const LOGS_PATH = path.join(__dirname, '..', 'logs');
const INFO_LOG_PATH = path.join(LOGS_PATH, 'info.log');
const ERROR_LOG_PATH = path.join(LOGS_PATH, 'errors.log');

const LOG_PRIORITY_MAP = {
  info: 0,
  warn: 1,
  error: 2
};

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

const streams = {
  info: infoLogStream,
  warn: errorLogStream,
  error: errorLogStream
};

const _getLogFileMessage = (name, ...payload) => {
  const time = new Date().toISOString();

  return `[${time}][${name}]: ${payload.join(' ')}\n`;
};

function makeLogger(name) {
  const _logHandlerFactory = (logFnName, colorFn) => {
    const shouldLogToConsole =
      LOG_PRIORITY_MAP[logFnName] >= LOG_PRIORITY_MAP[logLevel];

    return (...payload) => {
      const logFileMessage = _getLogFileMessage(name, ...payload);

      if (shouldLogToConsole) {
        console[logFnName](colorFn(`${name}:`), ...payload);
      }

      streams[logFnName].write(logFileMessage);
    };
  };

  return {
    info: _logHandlerFactory('info', colors.green),
    warn: _logHandlerFactory('warn', colors.yellow),
    error: _logHandlerFactory('error', colors.red)
  };
}

process.on('beforeExit', () => {
  infoLogStream.end();
  errorLogStream.end();
});

module.exports = makeLogger;
