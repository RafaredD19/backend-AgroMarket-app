const express = require('express');
const cors = require('cors');
const customerRoutes = require('./src/modules/customer/customerRoute');
const responseHandler = require('./src/middleware/responseHandler');
const encryptRoutes = require('./src/modules/encrypt/encryptRoute');

const app = express();

app.use(cors());
app.use(express.json());
app.use(responseHandler);

app.use('/api/customers', customerRoutes);
app.use('/api/encrypt', encryptRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
