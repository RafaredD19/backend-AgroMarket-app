const express = require('express');
const router = express.Router();
const encryptController = require('./encryptController');

router.post('/encrypt', encryptController.encrypt);
router.post('/decrypt', encryptController.decrypt);

module.exports = router;
