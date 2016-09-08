const actions = require('../actions');
const formPaths = require('./paths');

const methods = {
  initialize ({ self }) {
    self.input('');
  },

  clearForm ({ self }) {
    self.input('');
  },

  setInputValue ({ args: { value }, self }) {
    self.input(value);
  }
};

module.exports = {
  methods: methods,
  actions: actions(formPaths, methods)
};
