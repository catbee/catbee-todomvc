/**
 * Counter component. Counts active todos
 */
class Counter {

  render () {
    return this.$context.getWatcherData();
  }
}

module.exports = Counter;
