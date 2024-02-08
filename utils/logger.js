const colors = require('colors');
const config = require('config');
const { infoLogStream, errorLogStream } = require('../helpers/write-stream');
const { getLogMessage } = require('../helpers/logs-message');

const logLevel = config.get('LOG_LEVEL');

if (Number(config.get('COLORS_ENABLED')) === 0) {
  colors.disable();
}

function logger(name) {
  name = `${name}:`;

  const noop = () => {};
  const info = logLevel === 'info' ? console.log : noop;
  const warn = ['info', 'warn'].includes(logLevel) ? console.warn : noop;

  return {
    info: (...payload) => {
      info(colors.green(name), ...payload);
      infoLogStream.write(getLogMessage(...payload));
    },
    warn: (...payload) => {
      warn(colors.yellow(name), ...payload);
      errorLogStream.write(getLogMessage(...payload));
    },
    error: (...payload) => {
      console.error(colors.red(name), ...payload);
      errorLogStream.write(getLogMessage(...payload));
    }
  };
}

module.exports = logger;
