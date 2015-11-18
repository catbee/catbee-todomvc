var Baobab = require('baobab');

module.exports = {
  setBaseCount (args, state) {
    state.set('counter', Baobab.monkey(['todos'], (todos = []) => todos.length));
  }
};
