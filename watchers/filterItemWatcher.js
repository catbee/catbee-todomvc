module.exports = function filterItemWatcher ( { index }) {
  let filterIndex = Number(index);

  return {
    item: ['filters', 'list', filterIndex]
  };
};
