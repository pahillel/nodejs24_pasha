const LOG_LEVEL = process.env.LOG_LEVEL || 'warn';
const COLORS_ENABLED = process.env.COLORS_ENABLED || 0;
const PORT = process.env.PORT || 3000;

module.exports = {
  LOG_LEVEL,
  COLORS_ENABLED,
  PORT
};
