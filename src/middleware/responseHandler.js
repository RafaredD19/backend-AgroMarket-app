// src/middleware/responseHandler.js

const responseHandler = (req, res, next) => {
    res.success = (data, message = 'Success', status = 200) => {
      res.status(status).json({
        status,
        message,
        data
      });
    };
  
    res.error = (message = 'An error occurred', status = 500, data = null) => {
      res.status(status).json({
        status,
        message,
        data
      });
    };
  
    next();
  };
  
  module.exports = responseHandler;
  