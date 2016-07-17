require('localenv');

module.exports = {
  isRelease: process.env.NODE_ENV === 'production',
  port: process.env.PORT
};
