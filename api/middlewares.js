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

module.exports = {
  validate
};
