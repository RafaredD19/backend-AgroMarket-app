// src/utils/response.js

const successResponse = (res, message = 'Success', data = null) => {
    const response = {
      status: true,
      message
    };
  
    if (data) {
      response.data = data;
    }
  
    res.status(200).json(response);
  };
  
  const errorResponse = (res, message = 'An error occurred', status = 500) => {
    res.status(status).json({
      status: false,
      message
    });
  };
  
  module.exports = {
    successResponse,
    errorResponse
  };
  