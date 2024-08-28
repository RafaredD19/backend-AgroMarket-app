const customerService = require('../customer/customerService');

const createCustomer = async (req, res) => {
  try {
    const result = await customerService.createCustomer(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createCustomer };
