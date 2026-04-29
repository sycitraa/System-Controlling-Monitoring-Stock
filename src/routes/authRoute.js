const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: API untuk manajemen sesi pengguna (Login)
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login ke sistem WMS
 *     description: Autentikasi pengguna dengan email dan password untuk mendapatkan JWT.
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@wms.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login berhasil dan token JWT dikembalikan bersama data user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login berhasil
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     user:
 *                       type: object
 *                       properties:
 *                         id_user:
 *                           type: integer
 *                           example: 1
 *                         nama:
 *                           type: string
 *                           example: Admin WMS
 *                         email:
 *                           type: string
 *                           example: admin@wms.com
 *                         role:
 *                           type: string
 *                           example: Admin
 *       400:
 *         description: Email atau password belum diisi.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Email dan password wajib diisi
 *       401:
 *         description: Kredensial tidak valid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Email atau password salah
 *       500:
 *         description: Terjadi kesalahan server.
 */
router.post("/login", authController.login);

module.exports = router;
