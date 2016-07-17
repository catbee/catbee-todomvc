const { toggleAllCompleted, removeCompleted } = require('../../signals/form');

/**
 * Main component
 */
class Main {
  constructor () {
    this.template = require('./template.hbs');
  }

  render () {
    return this.$context.getWatcherData();
  }

  bind () {
    return {
      click: {
        /**
         * Toggle all items as completed/not completed
         * @param {object} e
         */
        '.toggle-all': (e) => {
          this.$context.signal(toggleAllCompleted, { isCompleted: e.target.checked });
        }
      }
    };
  }
}

module.exports = {
  constructor: Main,
  children: [
    {
      name: 'todo-list',
      component: require('../TodoList'),
      watcher: {
        todos: ['todosComputed']
      }
    },
    {
      name: 'counter',
      component: require('../Counter'),
      watcher: {
        counter: ['counter']
      }
    },
    {
      name: 'filter-list',
      component: require('../FilterList'),
      watcher: {
        filters: ['filters', 'list']
      }
    },
    {
      name: 'button',
      component: require('../Button'),
      props: {
        signal: removeCompleted,
        mode: 'clear-completed'
      }
    }
  ]
};
