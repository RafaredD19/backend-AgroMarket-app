const express = require('express');
const cors = require('cors');
const customerRoutes = require('./src/modules/customer/customerRoute');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/customers', customerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
