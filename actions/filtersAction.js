const FILTERS_LIST = [
  { name: 'all' },
  { name: 'active' },
  { name: 'completed'}
];

module.exports = {
  /**
   * Sets application's filters
   * @param {object} args
   * @param {object} state
   */
  setFiltersList (args, state) {
    state.set(['filters', 'list'], FILTERS_LIST);
  },

  /**
   * Sets active filter
   * @param {number} index - index of active filter
   * @param {object} state
   */
  setActiveFilter ( { index }, state ) {
    let filterIndex = index || 0;
    let filters = state.get(['filters', 'list']);

    filters.map( (filter, arrIndex ) => {
      if (arrIndex == filterIndex) {
        state.set(['filters', 'list', arrIndex, 'isActive'], true);
      } else {
        state.set(['filters', 'list', arrIndex, 'isActive'], false);
      }
    });

    let activeFilter = (filterIndex == 0) ? false : FILTERS_LIST[filterIndex].name;
    state.set(['filters', 'isActive'], activeFilter);
  }
};
