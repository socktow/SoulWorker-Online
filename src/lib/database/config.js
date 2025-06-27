function parseSqlServerUrl(url) {
    const regex = /^sqlserver:\/\/(.*?):(.*?)@(.*?):(\d+)\/(.*?)\?(.*)$/;
    const match = url.match(regex);
    if (!match) throw new Error('❌ DATABASE_URL format is invalid');
  
    const [, user, password, server, port, database, query] = match;
    const queryParams = new URLSearchParams(query);
  
    return {
      user,
      password,
      server,
      port: parseInt(port, 10),
      database,
      options: {
        encrypt: queryParams.get('encrypt') === 'true',
        trustServerCertificate: queryParams.get('trustServerCertificate') === 'true',
      },
    };
  }
  
  module.exports = { parseSqlServerUrl };
  