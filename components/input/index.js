/**
 * Input component
 */
class Input {
  constructor () {
    this.template = require('./template.hbs');
  }

  render () {
    return this.$context.getWatcherData()
      .then(data => Object.assign(this.$context.attributes, this.$context.props, data));
  }

  bind () {
    return {
      input: {
        /**
         * Sets new value for new input
         * @param {object} e
         */
        input: (e) => {
          const value = e.currentTarget.value;
          const { path, signal } = this.$context.props;

          this.$context.signal(signal, { path, value });
        }
      }
    };
  }
}

module.exports = {
  constructor: Input
};
