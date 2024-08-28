const { successResponse, errorResponse } = require('../../utils/response');
const authService = require('./authService');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return errorResponse(res, 'Username and password are required', 400);
  }

  try {
    const result = await authService.login(username, password);
    successResponse(res, 'Login successful', result);
  } catch (err) {
    errorResponse(res, err.message, 401);
  }
};

module.exports = { login };
