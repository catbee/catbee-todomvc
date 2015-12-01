class Input {
  render () {
    return this.$context.getWatcherData()
      .then(data => {
        return Object.assign(this.$context.attributes, data);
      });
  }

  bind () {
    return {
      input: {
        input: e => {
          var value = e.currentTarget.value;
          var path = this.$context.attributes.path;
          var signalName = this.$context.attributes.signal;

          this.$context.signal(signalName, { path, value });
        }
      }
    };
  }
}

module.exports = Input;
