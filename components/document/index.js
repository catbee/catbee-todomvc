const { appReady } = require('../../signals/page');
const { cancelEditingTodo } = require('../../signals/todo');

/**
 * Document component
 */
class Document {
  constructor () {
    this.template = require('./template.hbs');
  }

  bind () {
    this.$context.signal(appReady);

    return {
      click: {
        /**
         * Cancel editing item
         * @param {object} e
         */
        body: (e) => {
          if (e.target.className != 'edit') {
            this.$context.signal(cancelEditingTodo);
          }
        }
      }
    };
  }
}

module.exports = {
  constructor: Document,
  children: [
    {
      name: 'head',
      component: require('../head'),
      watcher: {
        title: ['statements', 'title']
      }
    },
    {
      name: 'header',
      component: require('../header'),
      watcher: {
        header: ['statements', 'header']
      }
    },
    {
      name: 'main',
      component: require('../main'),
      watcher: {
        isTodosNotEmpty: ['isTodosNotEmpty'],
        checked: ['allCompleted']
      }
    },
    {
      name: 'footer',
      component: require('../footer')
    }
  ]
};
