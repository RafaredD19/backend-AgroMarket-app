const db = require('../../config/db');
const customerCreateModel = require('../customer/model/customerCreateModel');

const createCustomer = async (data) => {
  try {
    const { error } = customerCreateModel.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const query = 'INSERT INTO tb_customer (user_id, firstName, lastName, bussinesName, phone, document) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [data.user_id, data.firstName, data.lastName, data.bussinesName, data.phone, data.document];

    await db.promise().query(query, values);
    return { message: 'Customer created successfully' };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { createCustomer };
