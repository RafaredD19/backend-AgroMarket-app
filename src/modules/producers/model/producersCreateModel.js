const Joi = require('joi');

const producersCreateModel = Joi.object({
  username: Joi.string().required().messages({
    'string.empty': 'Username is required',
    'any.required': 'Username is required'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
    'any.required': 'Password is required'
  }),
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required'
  }),
  bussinesName: Joi.string().optional(),
  document: Joi.string().length(11).required().messages({
    'string.length': 'Document must have exactly 11 digits',
    'any.required': 'Document is required'
  }),
  phone: Joi.string().length(9).required().messages({
    'string.length': 'Phone number must have exactly 9 digits',
    'any.required': 'Phone number is required'
  })
});

module.exports = producersCreateModel;
