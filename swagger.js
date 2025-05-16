const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'backend-diary API',
      version: '1.0.0',
      description: 'API REST sécurisée pour la gestion des utilisateurs',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/users',
        description: 'Serveur local',
      },
    ],
  },
  apis: ['./app/routes/*.js'], // <-- là où  je mets les commentaires Swagger
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
