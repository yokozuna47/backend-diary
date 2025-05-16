const env = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `.env.${env}` });

// console.log('ENV:', env);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);



module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres"
  },

  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false
  },

  production: {
    
  }
};
