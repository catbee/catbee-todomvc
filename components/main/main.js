class Main {

  render () {
    return this.$context.getWatcherData();
  }

  bind () {
    let attributes = this.$context.attributes;
    return {
      click: {
        '.toggle-all': (e) => {
          if (!attributes.signal) {
            return;
          }
          this.$context.signal(attributes.signal, { isCompleted: e.target.checked });
        }
      }
    };
  }

}


module.exports = Main;
