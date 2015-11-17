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
            args: attributes.args
          });
        }
      }
    }
  }
}

module.exports = Button;
