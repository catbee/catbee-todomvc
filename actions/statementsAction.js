module.exports = {
  setTitle (args, state) {
    state.set(['statements', 'title'], 'TodoMVC');
  },

  setHeader (args, state) {
    state.set(['statements', 'header'], 'todos');
  }
};
