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

const respond = (req, res) => {
  const { status = statusCodes.INTERNAL_SERVER_ERROR, data = 'no responce from API, try again later' } = req._apiResponse;
  console.log('api responce', status, data);

  res.status(status).send(data);
};

module.exports = {
  validate,
  respond
};
