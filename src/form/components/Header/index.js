const { addNewTodo, newTodoInput } = require('../../../signals');
const formPaths = require('../../paths');

class Header {
  constructor () {
    this.template = require('./template.hbs');
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
    this.$context.signal(addNewTodo, { value });
  }
}

module.exports = {
  constructor: Header,
  children: [
    {
      name: 'input',
      component: require('../Input'),
      watcher: {
        value: formPaths.input
      },
      props: {
        placeholder: 'What needs to be done?',
        mode: 'new-todo',
        signal: newTodoInput,
        autofocus: true
      }
    }
  ]
};
