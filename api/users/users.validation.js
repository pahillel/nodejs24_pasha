const Joi = require('joi');

const createUserValidation = {
  body: {
    email: Joi.string().trim().lowercase().email().min(4).max(80).required(),
    username: Joi.string().trim().required()
  }
};

const userByIdValidation = {
  params: {
    user_id: Joi.number().integer().positive().required()
  }
};

module.exports = {
  createUserValidation,
  userByIdValidation
};
