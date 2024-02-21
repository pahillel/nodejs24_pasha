const { celebrate } = require('celebrate');

const validate = (
  schema,
  options = {
    abortEarly: false,
    stripUnknown: {
      objects: true
    }
  },
  celebrateOptions = {}
) => {
  return celebrate(schema, options, celebrateOptions);
};

const response = (res, statusCode, data) => {
  res.status(statusCode).send(data);
};

module.exports = {
  validate,
  response
};
