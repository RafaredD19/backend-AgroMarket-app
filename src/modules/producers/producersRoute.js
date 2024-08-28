const express = require('express');
const router = express.Router();
const producersController = require('./producersController');

router.post('/create', producersController.createProducer);
router.get('/list', producersController.getProducers); 
router.patch('/:producerId', producersController.updateProducer);

module.exports = router;
