const FILTERS_LIST = [
  { name: 'all' },
  { name: 'active' },
  { name: 'completed'}
];

module.exports = {
  setFiltersList (args, state) {
    state.set(['filters', 'list'], FILTERS_LIST);
  },

  setActiveFilter ( { index = 0 }, state ) {
    let filters = state.get(['filters', 'list']);

    filters.map( (v, arrIndex ) => {
      if (arrIndex == index) state.set(['filters', 'list', arrIndex, 'isActive'], true);
      else state.set(['filters', 'list', arrIndex, 'isActive'], false);
    });
  }
};
