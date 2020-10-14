const fetch = require('node-fetch');

const getIP = (req) => {
  return '181.23.197.40';
  return (
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null)
  ).split(',')[0];
};

module.exports = {
  getCity: async (req) => {
    var ip = getIP(req);
    const ipRes = await fetch(`http://ip-api.com/json/${ip}`);
    const { city } = await ipRes.json();
    return city;
  },
};
