// src/controllers/authController.js
const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi input kosong
    if (!email || !password) {
      return errorResponse(res, 400, 'Email dan password wajib diisi');
    }

    // Panggil service
    const result = await authService.login(email, password);

    // Kirim response sukses (Format JSON otomatis rapi)
    return successResponse(res, 200, 'Login berhasil', result);
    
  } catch (error) {
    // Tangkap AppError (misal 401) atau error server (500)
    return errorResponse(res, error.statusCode || 500, error.message);
  }
};

module.exports = {
  login,
};