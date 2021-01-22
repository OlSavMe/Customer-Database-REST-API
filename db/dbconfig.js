const { Pool } = require("pg");
const dotenv = require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "customer",
  password: process.env.DB_PASSWORD,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
