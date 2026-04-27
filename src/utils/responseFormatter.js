const successResponse = (res, statusCode, message, data = null) => {
  const response = {
    success: true,
    message: message,
  };
  if (data) response.data = data;
  return res.status(statusCode).json(response);
};

const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};