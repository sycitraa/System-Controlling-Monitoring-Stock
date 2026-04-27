const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

const login = async (email, password) => {
  // 1. Cari user di database beserta data Role-nya
  const user = await prisma.user.findUnique({
    where: { email },
    include: { role: true },
  });

  // 2. Jika email tidak ditemukan
  if (!user) {
    throw new AppError('Email atau password salah', 401);
  }

  // 3. Bandingkan password input dengan hash di database
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError('Email atau password salah', 401);
  }

  // 4. Susun data yang akan diselipkan ke dalam Token JWT
  const payload = {
    id_user: user.id_user,
    email: user.email,
    id_role: user.id_role,
    nama_role: user.role.nama_role, 
  };

  // 5. Generate Token (Masa berlaku 8 jam)
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '8h',
  });

  // 6. Kembalikan token dan data user (tanpa mengirim password!)
  return {
    token,
    user: {
      id_user: user.id_user,
      nama: user.nama,
      email: user.email,
      role: user.role.nama_role,
    }
  };
};

module.exports = {
  login,
};