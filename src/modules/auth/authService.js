const db = require('../../config/db');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const userStorage = require('./jwt/userStorage');
const secretKey = process.env.JWT_SECRET_KEY;

const login = async (username, password) => {
  try {
    // Buscar el usuario en la base de datos
    const [user] = await db.query('SELECT * FROM tb_user WHERE username = ?', [username]);

    if (user.length === 0) {
      throw new Error('Invalid username or password');
    }

    // Desencriptar la contraseña almacenada y compararla con la proporcionada
    const decryptedPassword = CryptoJS.AES.decrypt(user[0].password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
    if (decryptedPassword !== password) {
      throw new Error('Invalid username or password');
    }

    // Generar el token JWT
    const token = jwt.sign(
      {
        userId: user[0].id,
        username: user[0].username,
        role: user[0].role,
      },
      secretKey,
      { expiresIn: '1h' }
    );

    // Almacenar los datos del usuario (sin la contraseña)
    userStorage.setUser({
      userId: user[0].id,
      username: user[0].username,
      role: user[0].role,
    });

    return { 
      userId: user[0].id,
      username: user[0].username,
      role: user[0].role,
      token 
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { login };
