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

  return error;
};

module.exports = {
  statusCodes,
  setError
};
