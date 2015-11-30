module.exports = function ({ index }) {
  index = Number(index);

  return {
    item: ['filters', 'list', index]
  }
};
