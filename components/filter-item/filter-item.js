class FilterItem {
  render () {
    return this.$context.getWatcherData();
  }

  bind () {
    return {
      click: {
        '.filter-item': (e) => {
          e.preventDefault();
          let attributes = this.$context.attributes;
          this.$context.signal('setAcFilter', { index: attributes.index });
        }
      }
    };
  }
}

module.exports = FilterItem;
