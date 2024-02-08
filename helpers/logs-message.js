const getLogMessage = (...payload) => {
  const date = new Date().toISOString();

  return `[${date}]: ${payload} \n`;
};

module.exports = {
  getLogMessage
};
