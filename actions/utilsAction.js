module.exports = {
  /**
   * Sets input's text in state
   * @param {string} path, value - path to value in state, value - input's value
   * @param {object} state
   */
  setInputValue ({ path, value }, state) {
    let currentPath = path && path.split('.');
    state.set(currentPath, value);
  }
};
