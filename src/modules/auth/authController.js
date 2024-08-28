const { successResponse, errorResponse } = require('../../utils/response');
const authService = require('./authService');
const authModel = require('./model/authModel');

const login = async (req, res) => {
  const { error } = authModel.validate(req.body);
  if (error) {
    return errorResponse(res, error.details[0].message, 400);
  }

  const { username, password } = req.body;

  try {
    const result = await authService.login(username, password);
    successResponse(res, 'Logueado correctamente', result);
  } catch (err) {
    errorResponse(res, err.message, 401);
  }
};

module.exports = { login };
