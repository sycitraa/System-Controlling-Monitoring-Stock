// src/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// 1. Import library Swagger dan Konfigurasinya
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger'); // Pastikan path ini benar mengarah ke file config-mu

// 2. Import Routes
const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute'); 

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// 3. Pasang Swagger menggunakan konfigurasi dari file config/swagger.js
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 4. Daftarkan Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Route dasar untuk testing
app.get('/', (req, res) => {
    res.json({ message: 'Selamat datang di WMS API!' });
});

// PENTING: Jangan ada app.listen() di sini karena sudah ditangani oleh index.js

module.exports = app;