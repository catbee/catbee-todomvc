var Baobab = require('baobab');

module.exports = {

  /**
   * Sets the number of uncompleted todos in list. Uses "monkey" to dynamically computing that number
   * @param {object} args
   * @param {object} state
   */
  setBaseCount (args, state) {
    state.set(['counter'], Baobab.monkey(
        ['todos'], (todos = []) => todos.filter( todo => todo.status == 'active').length)
    );
  }

};
