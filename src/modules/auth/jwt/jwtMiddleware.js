const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

const jwtMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ status: false, message: 'No token provided' });
  }

  jwt.verify(token.split(' ')[1], secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ status: false, message: 'Failed to authenticate token' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = jwtMiddleware;
