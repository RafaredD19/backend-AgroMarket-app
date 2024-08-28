const Joi = require('joi');

const decryptModel = Joi.object({
  encryptedData: Joi.string().required().messages({
    'string.base': 'Encrypted data must be a string',
    'string.empty': 'Encrypted data cannot be empty',
    'any.required': 'Encrypted data is required'
  })
});

module.exports = decryptModel;
