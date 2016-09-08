const paths = require('./paths');
const actions = require('../actions');

const FILTERS_LIST = [
  { name: 'all' },
  { name: 'active' },
  { name: 'completed' }
];

const methods = {
  initialize ({ self }) {
    self.list(FILTERS_LIST);
    self.isActive('all');
  },

  enableActiveFilter ({ self }) {
    self.isActive('active');
  },

  enableAllFilter ({ self }) {
    self.isActive('all');
  },

  enableCompletedFilter ({ self }) {
    self.isActive('completed');
  }
};

module.exports = {
  methods,
  actions: actions(paths, methods)
};
