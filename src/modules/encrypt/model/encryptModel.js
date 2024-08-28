const Joi = require('joi');

const encryptModel = Joi.object({
  data: Joi.string().required().messages({
    'string.base': 'Data must be a string',
    'string.empty': 'Data cannot be empty',
    'any.required': 'Data is required'
  })
});

module.exports = encryptModel;
