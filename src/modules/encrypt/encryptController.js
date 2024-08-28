const { encryptData, decryptData } = require('./encryptService');
const { successResponse, errorResponse } = require('../../utils/response');
const encryptModel = require('./model/encryptModel');
const decryptModel = require('./model/decryptModel');

const encrypt = (req, res) => {
  // Validar el body usando el modelo
  const { error } = encryptModel.validate(req.body);
  if (error) {
    return errorResponse(res, error.details[0].message, 400);
  }

  try {
    const { data } = req.body;
    const encryptedData = encryptData(data);
    successResponse(res, 'Data encrypted successfully', { encryptedData });
  } catch (err) {
    errorResponse(res, err.message, 500);
  }
};

const decrypt = (req, res) => {
  // Validar el body usando el modelo
  const { error } = decryptModel.validate(req.body);
  if (error) {
    return errorResponse(res, error.details[0].message, 400);
  }

  try {
    const { encryptedData } = req.body;
    const decryptedData = decryptData(encryptedData);
    successResponse(res, 'Data decrypted successfully', { decryptedData });
  } catch (err) {
    errorResponse(res, err.message, 500);
  }
};

module.exports = { encrypt, decrypt };
