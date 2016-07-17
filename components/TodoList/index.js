/**
 * Todos list component.
 */
class TodoList {
  constructor () {
    this.template = require('./template.hbs');
  }

  render () {
    return this.$context.getWatcherData();
  }
}

module.exports = {
  constructor: TodoList,
  children: [
    {
      name: 'todo-item',
      component: require('../TodoItem'),
      watcher: (attributes) => {
        const id = Number(attributes['cat-id']);

        return {
          name: ['todos', { id }, 'name'],
          checked: ['todos', { id }, 'checked']
        };
      }
    }
  ]
};
