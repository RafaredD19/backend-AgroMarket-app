const Joi = require('joi');

const authModel = Joi.object({
  username: Joi.string().required().messages({
    'string.empty': 'Se requiere Username',
    'any.required': 'Username is required'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
    'any.required': 'Password is required'
  })
});

module.exports = authModel;
