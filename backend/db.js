const { Pool } = require('pg');

const pool = new Pool({
  user: 'lineage',
  password: 'lineage',
  host: 'localhost', // usually 'localhost' for local development
  database: 'lineage_db',
  port: 5432, // default PostgreSQL port
});

module.exports = pool;

