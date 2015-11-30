class FilterItem {
  render () {
    return this.$context.getWatcherData().then( d => {
      //console.log(d);
      return d;
    });
  }

  bind () {
    return {
      click: {
        '.filter-item': (e) => {
          e.preventDefault();
          //console.log('filters')
        }
      }
    };
  }
}

module.exports = FilterItem;
