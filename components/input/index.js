var { html } = require('common-tags');
var classnames = require('classnames');

/**
 * Input component
 */
class Input {
  template (ctx) {
    var placeholder = `${ctx.placeholder ? `placeholder="${ctx.placeholder}"` : ''}`;
    var autofocus = `${ctx.autofocus ? `autofocus="true"` : ''}`;
    var value = `${ctx.value ? `value="${ctx.value}"` : ''}`;
    var classes = classnames(ctx.mode) ? `class="${classnames(ctx.mode)}"` : '';

    return html`<input ${classes} ${placeholder} ${autofocus} ${value} />`
  }

  render () {
    return this.$context.getWatcherData()
      .then(data => {
        return Object.assign(this.$context.attributes, this.$context.props, data);
      });
  }

  bind () {
    return {
      input: {
        /**
         * Sets new value for new input
         * @param {object} e
         */
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

module.exports = {
  constructor: Input
};
