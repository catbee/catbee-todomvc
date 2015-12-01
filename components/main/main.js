class Main {

  render () {
    return this.$context.getWatcherData();
  }

  bind () {
    return {
      click: {
        '.toggle-all': (e) => {
          if (!attributes.signal) {
            return;
          }
          this.$context.signal('toggleAllChecked', { isCompleted: e.target.checked });
        }
      }
    };
  }

}


module.exports = Main;
