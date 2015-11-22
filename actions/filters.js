const FILTERS_LIST = [
  { name: 'all' },
  { name: 'active' },
  { name: 'completed'}
];

module.exports = {
  setFiltersList (args, state) {
    state.set(['filters', 'list'], FILTERS_LIST);
  },

  setActiveFilter ({ index = 0 }, state) {
    state.set(['filters', 'list', index, 'isActive'], true);
  }
};
