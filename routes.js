const routes = [
  {
    expression: '/',
    args: {
      signal: require('./src/signals').route
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
