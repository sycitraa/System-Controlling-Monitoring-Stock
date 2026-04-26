const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // Versi OpenAPI standar
    info: {
      title: 'WMS API Documentation',
      version: '1.0.0',
      description: 'Dokumentasi API untuk Warehouse Management System (WMS)',
      contact: {
        name: 'WMS Project Team',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development Server',
      },
    ],
    // Konfigurasi ini PENTING karena sistem WMS kamu pakai JWT!
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Memberitahu Swagger di mana letak komentar dokumentasi kita
  apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;