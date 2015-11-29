var Baobab = require('baobab');

module.exports = {

  setBaseCount (args, state) {
    state.set(['counter'], Baobab.monkey(
            ['todos'], (todos = []) => todos.filter( v => v.status == 'active').length)
    );
  }

};
