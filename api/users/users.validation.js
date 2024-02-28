const Joi = require('joi');

const createUserValidation = {
  body: {
    name: Joi.string().trim().lowercase().max(64).required(),
    email: Joi.string().trim().lowercase().email().min(4).max(64).required()
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
