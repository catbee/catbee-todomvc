class Main {

  render () {
    return this.$context.getWatcherData();
  }

  bind () {
    return {
      click: {
        '.toggle-all': (e) => {
          this.$context.signal('toggleAllCompleted', { isCompleted: e.target.checked });
        }
      }
    };
  }

}


module.exports = Main;
