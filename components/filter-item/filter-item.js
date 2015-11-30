class FilterItem {
  render () {
    return this.$context.getWatcherData();
  }

  bind () {
    return {
      click: {
        '.filter-item': (e) => e.preventDefault()
      }
    };
  }
}

module.exports = FilterItem;
