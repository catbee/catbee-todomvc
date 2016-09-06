const paths = require('./paths');
const actions = require('../actions');

const methods = {
  initialize ({ self }) {
    self.title('TodoMVC');
    self.header('todos');
  }
};

module.exports = {
  methods,
  actions: actions(paths, methods)
};
