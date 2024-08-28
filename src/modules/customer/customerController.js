const { successResponse, errorResponse } = require('../../utils/response');
const customerService = require('./customerService');
const customerCreateModel = require('./model/customerCreateModel');

const createCustomer = async (req, res) => {

  const { error } = customerCreateModel.validate(req.body);
  if (error) {
    return errorResponse(res, error.details[0].message, 400);
  }

  try {
    const result = await customerService.createCustomer(req.body);
    successResponse(res, 'Customer created successfully', result);
  } catch (err) {
    errorResponse(res, err.message, 500);
  }
};

const getCustomers = async (req, res) => {
  try {
    const customers = await customerService.listCustomers();
    successResponse(res, 'Customers retrieved successfully', customers);
  } catch (err) {
    errorResponse(res, err.message, 500);
  }
};


const updateCustomer = async (req, res) => {
  const { customerId } = req.params;

  // Validar el body usando el modelo de creación existente
  const { error } = customerCreateModel.validate(req.body);
  if (error) {
    return errorResponse(res, error.details[0].message, 400);
  }

  try {
    const result = await customerService.updateCustomer(customerId, req.body);
    successResponse(res, 'Customer updated successfully', result);
  } catch (err) {
    errorResponse(res, err.message, 500);
  }
};
module.exports = { createCustomer,getCustomers, updateCustomer };
