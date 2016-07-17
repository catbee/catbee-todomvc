module.exports = {
  /**
   * Sets input's text in state
   * @param {object} args
   * @param {string} args.path - path to value in state
   * @param {string} args.value - input's value
   * @param {object} state
   */
  setInputValue ({ path, value }, state) {
    state.set(path, value);
  }
};
