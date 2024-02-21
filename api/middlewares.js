const { celebrate, isCelebrateError } = require('celebrate');
const { statusCodes } = require('./constants');

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
  return (req, res, next) => {
    celebrate(schema, options, celebrateOptions)(req, res, (err) => {
      if (err && isCelebrateError(err)) {
        const error = Array.from(err.details.entries()).map(
          ([key, detail]) => `Validation error (${key}): ${detail.message}`
        );

        return res.status(statusCodes.BAD_REQUEST).json({ error });
      }

      next();
    });
  };
};

const response = (res, statusCode, data) => {
  res.status(statusCode).send(data);
};

module.exports = {
  validate,
  response
};
