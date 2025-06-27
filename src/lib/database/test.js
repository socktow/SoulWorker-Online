const { getPool, sql } = require('./index');
require('dotenv').config();

const dbKeys = [
  'DATABASE_URL_ACCOUNT',
  'DATABASE_URL_COMMON',
  'DATABASE_URL_GAME',
  'DATABASE_URL_GMTOOL',
  'DATABASE_URL_LOG',
];

(async () => {
  const connected = [];
  const summary = [];

  for (const key of dbKeys) {
    try {
      const pool = await getPool(key);
      if (key === 'DATABASE_URL_ACCOUNT') {
        const result = await pool.request().query('SELECT TOP 10 ACCOUNT_ID, UAID FROM TB_Account');
        console.log(`\n📄 ${key} ➜ TB_Account:`);
        console.table(result.recordset);
      }
      connected.push(key);
      summary.push({ Database: key, Status: '✅ Connected' });
    } catch (err) {
      summary.push({ Database: key, Status: `❌ ${err.message}` });
    }
  }

  console.log(`\n🔌 Database Connection Summary (${connected.length}/${dbKeys.length}):`);
  console.table(summary);
})();
