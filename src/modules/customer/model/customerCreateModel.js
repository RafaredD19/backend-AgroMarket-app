const Joi = require('joi');

const customerCreateModel = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  bussinesName: Joi.string().optional(),
  phone: Joi.string().optional(),
  document: Joi.string().optional()
});

module.exports = customerCreateModel;
