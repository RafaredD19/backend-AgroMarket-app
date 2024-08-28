const db = require('../../config/db');
const CryptoJS = require('crypto-js');
const bcrypt = require('bcrypt');

const createCustomer = async (data) => {
  const connection = await db.getConnection();
  const secretKey = process.env.SECRET_KEY ;  // Deberías guardar la clave en las variables de entorno

  try {
    await connection.beginTransaction();

    // Validar que el username no exista
    const [existingUser] = await connection.query('SELECT id FROM tb_user WHERE username = ?', [data.username]);
    if (existingUser.length > 0) {
      throw new Error('Username already exists');
    }

    // Validar que el DNI tenga 7 dígitos
    if (!/^\d{7}$/.test(data.document)) {
      throw new Error('Document (DNI) must have exactly 7 digits');
    }

    // Validar que el teléfono tenga 9 dígitos
    if (!/^\d{9}$/.test(data.phone)) {
      throw new Error('Phone number must have exactly 9 digits');
    }

    // Cifrar la contraseña
    const encryptedPassword = CryptoJS.AES.encrypt(data.password, secretKey).toString();

    // Insertar el usuario en la tabla tb_user
    const userQuery = 'INSERT INTO tb_user (username, password, role) VALUES (?, ?, ?)';
    const userValues = [data.username, encryptedPassword, 'CUSTOMER'];
    const [userResult] = await connection.query(userQuery, userValues);

    const userId = userResult.insertId;

    // Insertar el customer en la tabla tb_customer
    const customerQuery = 'INSERT INTO tb_customer (user_id, firstName, lastName, bussinesName, phone, document) VALUES (?, ?, ?, ?, ?, ?)';
    const customerValues = [userId, data.firstName, data.lastName, data.bussinesName, data.phone, data.document];
    await connection.query(customerQuery, customerValues);

    await connection.commit();

    return {
      userId,
      username: data.username,
      role: 'CUSTOMER',
      firstName: data.firstName,
      lastName: data.lastName,
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
const listCustomers = async () => {
  try {
    const [customers] = await db.query(`
      SELECT 
        c.id AS customerId, 
        u.username, 
        u.role, 
        c.firstName, 
        c.lastName, 
        c.bussinesName, 
        c.phone, 
        c.document
      FROM tb_customer c
      JOIN tb_user u ON c.user_id = u.id
    `);

    return customers;
  } catch (err) {
    throw new Error('Error retrieving customers: ' + err.message);
  }
};

const updateCustomer = async (customerId, data) => {
  const connection = await db.getConnection();
  const secretKey = process.env.SECRET_KEY;

  try {
    await connection.beginTransaction();

    // Verificar que el customer existe
    const [existingCustomer] = await connection.query('SELECT id, user_id FROM tb_customer WHERE id = ?', [customerId]);
    if (existingCustomer.length === 0) {
      throw new Error('Customer not found');
    }

    // Validar que el username no exista para otro usuario
    const [existingUser] = await connection.query('SELECT id FROM tb_user WHERE username = ? AND id != ?', [data.username, existingCustomer[0].user_id]);
    if (existingUser.length > 0) {
      throw new Error('Username already exists');
    }

    // Validar que el DNI tenga 7 dígitos
    if (!/^\d{7}$/.test(data.document)) {
      throw new Error('Document (DNI) must have exactly 7 digits');
    }

    // Validar que el teléfono tenga 9 dígitos
    if (!/^\d{9}$/.test(data.phone)) {
      throw new Error('Phone number must have exactly 9 digits');
    }

    // Actualizar la tabla tb_user
    const userUpdateQuery = 'UPDATE tb_user SET username = ? WHERE id = ?';
    const userValues = [data.username, existingCustomer[0].user_id];
    await connection.query(userUpdateQuery, userValues);

    // Actualizar la contraseña si se proporciona
    if (data.password) {
      const encryptedPassword = CryptoJS.AES.encrypt(data.password, secretKey).toString();
      const passwordUpdateQuery = 'UPDATE tb_user SET password = ? WHERE id = ?';
      await connection.query(passwordUpdateQuery, [encryptedPassword, existingCustomer[0].user_id]);
    }

    // Actualizar la tabla tb_customer
    const customerUpdateQuery = `
      UPDATE tb_customer 
      SET firstName = ?, lastName = ?, bussinesName = ?, phone = ?, document = ? 
      WHERE id = ?`;
    const customerValues = [data.firstName, data.lastName, data.bussinesName, data.phone, data.document, customerId];
    await connection.query(customerUpdateQuery, customerValues);

    await connection.commit();

    return {
      customerId,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
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
module.exports = { createCustomer, listCustomers, updateCustomer };
