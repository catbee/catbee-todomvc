/**
 * Button component
 */
class Button {
  constructor () {
    this.template = require('./template.hbs');
  }

  render () {
    return this.$context.props;
  }

  bind () {
    const { signal } = this.$context.props;
    const { value } = this.$context.attributes;

    return {
      click: {
        /**
         * Sends signal that depends of attribute 'signal' when clicking button
         * @param {object} e
         */
        button: (e) => {
          e.preventDefault();

          if (!signal) {
            return;
          }

          this.$context.signal(signal, { value });
        }
      }
    };
  }
}

module.exports = {
  constructor: Button
};
