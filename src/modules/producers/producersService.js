const CryptoJS = require('crypto-js');
const db = require('../../config/db');

const createProducer = async (data) => {
  const connection = await db.getConnection();
  const secretKey = process.env.SECRET_KEY;

  try {
    await connection.beginTransaction();

    // Validar que el username no exista
    const [existingUser] = await connection.query('SELECT id FROM tb_user WHERE username = ?', [data.username]);
    if (existingUser.length > 0) {
      throw new Error('Username already exists');
    }

    // Encriptar la contraseña
    const encryptedPassword = CryptoJS.AES.encrypt(data.password, secretKey).toString();

    // Insertar el usuario en la tabla tb_user
    const userQuery = 'INSERT INTO tb_user (username, password, role) VALUES (?, ?, ?)';
    const userValues = [data.username, encryptedPassword, 'PRODUCER'];
    const [userResult] = await connection.query(userQuery, userValues);

    const userId = userResult.insertId;

    // Insertar el producer en la tabla tb_producers
    const producerQuery = 'INSERT INTO tb_producers (user_id, name, bussinesName, document, phone) VALUES (?, ?, ?, ?, ?)';
    const producerValues = [userId, data.name, data.bussinesName, data.document, data.phone];
    await connection.query(producerQuery, producerValues);

    await connection.commit();

    return {
      userId,
      username: data.username,
      role: 'PRODUCER',
      name: data.name,
      bussinesName: data.bussinesName,
      phone: data.phone,
      document: data.document
    };
  } catch (err) {
    await connection.rollback();
    throw new Error(err.message);
  } finally {
    connection.release();
  }
};

const listProducers = async () => {
    try {
      const [producers] = await db.query(`
        SELECT 
          p.id AS producerId, 
          u.username, 
          u.role, 
          p.name, 
          p.bussinesName, 
          p.document, 
          p.phone
        FROM tb_producers p
        JOIN tb_user u ON p.user_id = u.id
      `);
  
      return producers;
    } catch (err) {
      throw new Error('Error retrieving producers: ' + err.message);
    }
  };

const updateProducer = async (producerId, data) => {
    const connection = await db.getConnection();
    const secretKey = process.env.SECRET_KEY;
  
    try {
      await connection.beginTransaction();
  
      // Verificar que el producer existe
      const [existingProducer] = await connection.query('SELECT id, user_id FROM tb_producers WHERE id = ?', [producerId]);
      if (existingProducer.length === 0) {
        throw new Error('Producer not found');
      }
  
      // Validar que el username no exista para otro usuario
      const [existingUser] = await connection.query('SELECT id FROM tb_user WHERE username = ? AND id != ?', [data.username, existingProducer[0].user_id]);
      if (existingUser.length > 0) {
        throw new Error('Username already exists');
      }
  
      // Actualizar la tabla tb_user
      const userUpdateQuery = 'UPDATE tb_user SET username = ? WHERE id = ?';
      const userValues = [data.username, existingProducer[0].user_id];
      await connection.query(userUpdateQuery, userValues);
  
      // Actualizar la contraseña si se proporciona
      if (data.password) {
        const encryptedPassword = CryptoJS.AES.encrypt(data.password, secretKey).toString();
        const passwordUpdateQuery = 'UPDATE tb_user SET password = ? WHERE id = ?';
        await connection.query(passwordUpdateQuery, [encryptedPassword, existingProducer[0].user_id]);
      }
  
      // Actualizar la tabla tb_producers
      const producerUpdateQuery = `
        UPDATE tb_producers 
        SET name = ?, bussinesName = ?, document = ?, phone = ? 
        WHERE id = ?`;
      const producerValues = [data.name, data.bussinesName, data.document, data.phone, producerId];
      await connection.query(producerUpdateQuery, producerValues);
  
      await connection.commit();
  
      return {
        producerId,
        username: data.username,
        name: data.name,
        bussinesName: data.bussinesName,
        document: data.document,
        phone: data.phone
      };
    } catch (err) {
      await connection.rollback();
      throw new Error(err.message);
    } finally {
      connection.release();
    }
  };

module.exports = { createProducer, listProducers, updateProducer };
