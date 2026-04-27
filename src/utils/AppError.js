class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Menandakan ini error yang kita prediksi (bukan server crash)
    
    // Menangkap lokasi spesifik di mana error terjadi
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;