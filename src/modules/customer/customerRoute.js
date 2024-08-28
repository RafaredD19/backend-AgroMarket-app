const express = require('express');
const router = express.Router();
const customerController = require('../customer/customerController');

router.post('/create', customerController.createCustomer);

module.exports = router;
