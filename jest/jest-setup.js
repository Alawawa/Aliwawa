
module.exports = () => {
  console.log('dirname:', __dirname);
  global.testServer = require('../server/server.js');
};
