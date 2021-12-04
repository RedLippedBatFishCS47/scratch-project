const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: DB_URI });

module.exports = {
  query: (text, params, callback) => {
    console.log('exected query', text);
    return pool.query(text, params, callback);
  },
};
