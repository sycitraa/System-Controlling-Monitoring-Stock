const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// 1. Import Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// 2. Pasang endpoint UI Swagger (Bisa diakses di browser)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Contoh rute dasar
app.get('/', (req, res) => {
    res.json({ message: 'Selamat datang di WMS API!' });
});

module.exports = app;