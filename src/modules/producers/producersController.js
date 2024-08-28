const { successResponse, errorResponse } = require('../../utils/response');
const producersService = require('./producersService');
const producersCreateModel = require('./model/producersCreateModel');

const createProducer = async (req, res) => {
  // Validar el body usando el modelo
  const { error } = producersCreateModel.validate(req.body);
  if (error) {
    return errorResponse(res, error.details[0].message, 400);
  }

  try {
    const result = await producersService.createProducer(req.body);
    successResponse(res, 'Producer created successfully', result);
  } catch (err) {
    errorResponse(res, err.message, 500);
  }
};

const getProducers = async (req, res) => {
    try {
      const producers = await producersService.listProducers();
      successResponse(res, 'Producers retrieved successfully', producers);
    } catch (err) {
      errorResponse(res, err.message, 500);
    }
  };

  const updateProducer = async (req, res) => {
    const { producerId } = req.params;
  
    // Validar el body usando el modelo de creación existente
    const { error } = producersCreateModel.validate(req.body);
    if (error) {
      return errorResponse(res, error.details[0].message, 400);
    }
  
    try {
      const result = await producersService.updateProducer(producerId, req.body);
      successResponse(res, 'Producer updated successfully', result);
    } catch (err) {
      errorResponse(res, err.message, 500);
    }
  };

module.exports = { createProducer, getProducers , updateProducer};
