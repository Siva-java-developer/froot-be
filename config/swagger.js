const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'FrootFast Backend API',
    version: '1.0.0',
    description: 'API documentation for FrootFast Backend',
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 5000}`,
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          mobileNumber: { type: 'string' },
          password: { type: 'string' },
          role: { type: 'string', enum: ['superadmin', 'admin'] },
          outletId: { type: 'string' },
          status: { type: 'boolean' }
        }
      },
      Outlet: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          city: { type: 'string' }
        }
      },
      Event: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          feedback: { type: 'string' },
          greetings: { type: 'string' }
        }
      },
      Contact: {
        type: 'object',
        required: ['name', 'email', 'number', 'message'],
        properties: {
          name: { type: 'string' },
          email: { type: 'string', format: 'email' },
          number: { type: 'string', pattern: '^\\d{10}$' },
          message: { type: 'string' }
        }
      },
      Review: {
        type: 'object',
        required: ['name', 'number', 'rating', 'reviewText'],
        properties: {
          name: { type: 'string' },
          number: { type: 'string', pattern: '^\\d{10}$' },
          rating: { type: 'number', minimum: 1, maximum: 5 },
          reviewText: { type: 'string' }
        }
      },
      Finance: {
        type: 'object',
        required: ['name', 'amount', 'spendBy', 'description'],
        properties: {
          name: { type: 'string' },
          amount: { type: 'number', minimum: 0 },
          spendBy: { type: 'string' },
          description: { type: 'string' }
        }
      },
      Prebook: {
        type: 'object',
        required: ['name', 'number', 'boxType', 'date', 'outletId'],
        properties: {
          name: { type: 'string' },
          number: { type: 'string', pattern: '^\\d{10}$' },
          boxType: { type: 'string' },
          date: { type: 'string', format: 'date' },
          outletId: { type: 'string' }
        }
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;