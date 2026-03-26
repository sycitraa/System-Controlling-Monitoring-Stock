const express = require('express');
const cors = require('cors');

const app = express();

// middleware global
app.use(cors());
app.use(express.json());

// test route
app.get('/', (req, res) => {
    res.send('WMS API is running 🚀');
});

module.exports = app;