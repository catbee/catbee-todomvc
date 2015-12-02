module.exports = {
  setInputValue ({ path, value }, state) {
    let currentPath = path && path.split('.');
    state.set(currentPath, value);
  }
};
