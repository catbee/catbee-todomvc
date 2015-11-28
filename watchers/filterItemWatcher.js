module.exports = function ({ index }) {
  index = Number(index);

  return {
    name: ['filters', 'list', index, 'name']
  }
};
