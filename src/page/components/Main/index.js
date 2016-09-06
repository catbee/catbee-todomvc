const { markAllActive, markAllCompleted, removeCompleted } = require('../../../signals');
const todoPaths = require('../../../todo/paths');
const filterPaths = require('../../../filters/paths');

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
          this.$context.signal(e.target.checked ?
            markAllCompleted :
            markAllActive);
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
      component: require('../../../todo/components/TodoList'),
      watcher: {
        todos: todoPaths.todosComputed
      }
    },
    {
      name: 'counter',
      component: require('../../../todo/components/Counter'),
      watcher: {
        counter: todoPaths.counter
      }
    },
    {
      name: 'filter-list',
      component: require('../../../filters/components/FilterList'),
      watcher: {
        filters: filterPaths.list
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
