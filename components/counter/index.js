/**
 * Counter component. Counts active todos
 */
class Counter {
  constructor () {
    this.template = require('./template.hbs');
  }

  render () {
    return this.$context.getWatcherData();
  }
}

module.exports = {
  constructor: Counter
};
