const sql = require('mssql');
const { parseSqlServerUrl } = require('./config');
require('dotenv').config();

const connections = {};

async function getPool(envKey) {
  const url = process.env[envKey];
  if (!url) throw new Error(`❌ Missing env: ${envKey}`);

  if (!connections[envKey]) {
    const config = parseSqlServerUrl(url);
    connections[envKey] = await new sql.ConnectionPool(config).connect();
    console.log(`✅ Connected to ${envKey}`);
  }

  return connections[envKey];
}

module.exports = { getPool, sql };
