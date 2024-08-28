const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return { valid: true, expired: false, decoded };
  } catch (err) {
    return {
      valid: false,
      expired: err.message.includes('jwt expired'),
      decoded: null,
    };
  }
};

module.exports = validateToken;
