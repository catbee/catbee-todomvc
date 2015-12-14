module.exports = {
  /**
   * Sets application's title
   * @param {object} args
   * @param {object} state
   */
  setTitle (args, state) {
    state.set(['statements', 'title'], 'TodoMVC');
  },

  /**
   * Sets application's header
   * @param {object} args
   * @param {object} state
   */
  setHeader (args, state) {
    state.set(['statements', 'header'], 'todos');
  }
};
