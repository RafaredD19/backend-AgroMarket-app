const CryptoJS = require('crypto-js');

const encryptData = (data) => {
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw new Error('Secret key is not defined in environment variables');
  }

  const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
  return encryptedData;
};

const decryptData = (encryptedData) => {
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw new Error('Secret key is not defined in environment variables');
  }

  const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
  return decryptedData;
};

module.exports = { encryptData, decryptData };
