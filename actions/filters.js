var Baobab = require('baobab');

module.exports = {
  setFiltersList (args, state) {
    state.set(
      ['filters', 'list'],
      ['all', 'active', 'completed']
    );
  },

  setActiveFilter ({ index }, state) {
    state.set(['filters', 'active'], index);
  },

  setFilters (args, state) {
    state.set(['filters', 'data'], Baobab.monkey(
      ['filters', 'list'],
      ['filters', 'active'],
      function (list, activeId) {
        return list.map((name, id) => {
          return {
            name, id,
            isActive: activeId === id
          };
        })
      }
    ));
  }
};
