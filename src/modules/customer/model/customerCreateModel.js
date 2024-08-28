const Joi = require('joi');

const customerCreateModel = Joi.object({
  user_id: Joi.number().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  bussinesName: Joi.string().optional(),
  phone: Joi.string().optional(),
  document: Joi.string().optional()
});

module.exports = customerCreateModel;
