module.exports = {
  setInputValue ({ path, value }, state) {
    path = path && path.split('.');
    state.set(path, value);
  }
};
