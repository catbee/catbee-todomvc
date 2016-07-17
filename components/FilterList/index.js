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
      name: 'filter-item',
      component: require('../FilterItem'),
      watcher: ({ index }) => {
        let filterIndex = Number(index);

        return {
          item: ['filters', 'list', filterIndex],
          activeFilter: ['filters', 'isActive']
        }
      }
    }
  ]
};
