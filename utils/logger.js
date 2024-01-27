const colors = require('colors');
const config = require('config');

const is_enabled = Number(config.get('COLORS_ENABLED')) === 1;
const log_level = config.get('LOG_LEVEL');

function logger(name) {
    name = `${name}:`;
    
    const noop = () => { };
    const info = log_level === 'info' ? console.log : noop;
    const warn = ['info', 'warn'].includes(log_level) ? console.warn : noop;
    const error = ['info', 'warn', 'error'].includes(log_level) ? console.error : noop;

    return {
        info: (...payload) => {
            info(is_enabled ? colors.green(name) : name, ...payload)
        },
        warn: (...payload) => {
            warn(is_enabled ? colors.yellow(name) : name, ...payload)
        },
        error: (...payload) => {
            error(is_enabled ? colors.red(name) : name, ...payload)
        },
    }
}

module.exports = logger;