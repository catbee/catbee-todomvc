const { route, cancelEditingTodo } = require('../../../signals');
const pagePaths = require('../../paths');
const todoPaths = require('../../../todo/paths');

/**
 * Document component
 */
class Document {
  constructor () {
    this.template = require('./template.hbs');
  }

  bind () {
    this.$context.signal(route);
    return {
      click: {
        /**
         * Cancel editing item
         * @param {object} e
         */
        body: (e) => {
          if (e.target.className !== 'edit') {
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
      component: require('../Head'),
      watcher: {
        title: pagePaths.title
      }
    },
    {
      name: 'header',
      component: require('../../../form/components/Header'),
      watcher: {
        header: pagePaths.header
      }
    },
    {
      name: 'main',
      component: require('../Main'),
      watcher: {
        isTodosNotEmpty: todoPaths.isTodosNotEmpty,
        checked: todoPaths.allCompleted
      }
    },
    {
      name: 'footer',
      component: require('../Footer')
    }
  ]
};
