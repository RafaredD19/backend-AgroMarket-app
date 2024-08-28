const express = require('express');
const router = express.Router();
const customerController = require('../customer/customerController');

router.post('/create', customerController.createCustomer);
router.get('/list', customerController.getCustomers);
router.patch('/:customerId', customerController.updateCustomer); 

module.exports = router;
