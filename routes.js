const routes = [
  {
    expression: '/',
    args: {
      signal: require('./signals/page').route
    }
  }
];

module.exports = {
  /**
   * @param {Catbee} cat
   */
  register (cat) {
    routes.forEach((route) => cat.registerRoute(route));
  }
};
