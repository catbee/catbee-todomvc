/**
 * Button component
 */
class Button {
  render () {
    return this.$context.attributes;
  }

  bind () {
    var attributes = this.$context.attributes;

    return {
      click: {
        /**
         * Sends signal that depends of attribute 'signal' when clicking button
         * @param {object} e
         */
        button: e => {
          e.preventDefault();

          if (!attributes.signal) {
            return;
          }

          this.$context.signal(attributes.signal, {
            value: attributes.value
          });
        }
      }
    };
  }
}

module.exports = Button;
