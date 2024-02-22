const statusCodes = {
  CREATED: 201,
  OK: 200,
  DELETED: 204,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500
};

const setError = (message = '', statusCode) => {
  const error = new Error(message);
  error.status = statusCode;
  error.type = 'API_ERROR';

  return error;
};

const response = (req, next, dto) => {
  req._apiResponse = { ...dto };
  return next();
};

module.exports = {
  statusCodes,
  setError,
  response
};
