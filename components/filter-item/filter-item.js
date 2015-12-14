/**
 * Application's filter
 */
class FilterItem {
  render () {
    return this.$context.getWatcherData();
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
          this.$context.signal('setActiveFilter', { index });
        }
      }
    };
  }
}

module.exports = FilterItem;
