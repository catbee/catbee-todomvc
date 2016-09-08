const filterPaths = require('../../paths');
const signals = require('../../../signals');

/**
 * List of application's filters
 */
class FilterList {
  constructor () {
    this.template = require('./template.hbs');
  }

  render () {
    return this.$context.getWatcherData();
  }
}

module.exports = {
  constructor: FilterList,
  children: [
    {
      name: 'all-filter',
      component: require('../FilterItem'),
      props: {
        onClick: signals.allFilter
      },
      watcher: {
        activeFilter: filterPaths.isActive
      }
    },
    {
      name: 'active-filter',
      component: require('../FilterItem'),
      props: {
        onClick: signals.activeFilter
      },
      watcher: {
        activeFilter: filterPaths.isActive
      }
    },
    {
      name: 'completed-filter',
      component: require('../FilterItem'),
      props: {
        onClick: signals.completedFilter
      },
      watcher: {
        activeFilter: filterPaths.isActive
      }
    }
  ]
};
