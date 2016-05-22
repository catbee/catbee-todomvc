var { html } = require('common-tags');

class Header {
  template (ctx) {
    return html`
      <header class="header">
        <h1>${ctx.header}</h1>
        <form>
          <cat-input />
        </form>
      </header>
    `
  }

  render () {
    return this.$context.getWatcherData();
  }

  bind () {
    return {
      submit: {
        '#add-new-todo': this.addNewTodo
      }
    };
  }

  /**
   * Adds new item
   * @param {Event} e
   */
  addNewTodo (e) {
    e.preventDefault();
    let value = e.currentTarget.elements[0].value;
    this.$context.signal('addNewTodo', { value });
  }
}

module.exports = {
  constructor: Header,
  children: [
    {
      name: 'input',
      component: require('../input'),
      watcher: {
        value: ['form', 'input']
      },
      props: {
        placeholder: 'What needs to be done?',
        mode: 'new-todo',
        signal: require('../../signals/todoSignals').newTodoInput,
        path: ['form', 'input'],
        autofocus: true
      }
    }
  ]
};
