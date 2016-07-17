const { setActiveFilter } = require('../../signals/form');

/**
 * Application's filter
 */
class FilterItem {
  constructor () {
    this.template = require('./template.hbs');
  }

  render () {
    return this.$context.getWatcherData()
      .then((data) => Object.assign({
        isActive: data.activeFilter === data.item.name
      }, data));
  }

  bind () {
    return {
      click: {
        /**
         * Sets active filter
         * @param {object} e
         */
        '.filter-item': (e) => {
          e.preventDefault();
          let { index } = this.$context.attributes;
          this.$context.signal(setActiveFilter, { index });
        }
      }
    };
  }
}

module.exports = {
  constructor: FilterItem
};
