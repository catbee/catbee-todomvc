/**
 * Application's filter
 */
class FilterItem {
  constructor () {
    this.template = require('./template.hbs');
  }

  render () {
    const name = this.$context.attributes.name;
    return this.$context.getWatcherData()
      .then((data) => Object.assign({
        name,
        isActive: data.activeFilter === name
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
          this.$context.signal(this.$context.props.onClick);
        }
      }
    };
  }
}

module.exports = {
  constructor: FilterItem
};
