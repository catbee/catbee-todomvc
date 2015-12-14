/**
 * Main component
 */
class Main {

  render () {
    return this.$context.getWatcherData();
  }

  bind () {
    return {
      click: {
        /**
         * Toggle all items as completed/not completed
         * @param {object} e
         */
        '.toggle-all': (e) => {
          this.$context.signal('toggleAllCompleted', { isCompleted: e.target.checked });
        }
      }
    };
  }

}


module.exports = Main;
