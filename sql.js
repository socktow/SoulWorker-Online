const sql = require("mssql");

const config = {
  user: 'sa',
  password: '123456',
  server: '127.0.0.1',
  port: 1435,
  database: 'AccountDB',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

sql.connect(config).then(() => {
  console.log("✅ MSSQL connected successfully.");
  return sql.close();
}).catch((err) => {
  console.error("❌ Connection failed:", err);
});
