class Button {
  render () {
    return this.$context.attributes;
  }

  bind () {
    var attributes = this.$context.attributes;

    return {
      click: {
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
