if (process.env.NODE_ENV !== 'production') require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DBTEST_USER,
    password: process.env.DBTEST_PASS,
    database: process.env.DBTEST_NAME,
    host: process.env.DBTEST_HOST,
    port: process.env.DBTEST_PORT,
    dialect: 'mysql',
  },
};
