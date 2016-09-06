const {
  todoItemDoubleClick,
  markOneActive,
  markOneCompleted,
  todoItemOnEnter,
  removeTodo
} = require('../../../signals');

/**
 * Todo item component
 */
class TodoItem {
  constructor () {
    this.template = require('./template.hbs');
  }

  render () {
    const attrs = this.$context.attributes;
    return {
      name: attrs.name,
      checked: attrs.status === 'completed'
    };
  }

  bind () {
    return {
      dblclick: {
        /**
         * Edit item
         */
        '.view': () => {
          this.$context.signal(todoItemDoubleClick, {
            id: Number(this.$context.attributes['id'])
          });
        }
      },

      click: {
        /**
         * Remove item
         */
        '.destroy': () => {
          this.$context.signal(removeTodo, {
            id: Number(this.$context.attributes['id'])
          });
        },

        /**
         * Toggle item as completed/not completed
         * @param {Event} e
         */
        '.toggle': (e) => {
          const args = { id: Number(this.$context.attributes['id']) };
          this.$context.signal(e.target.checked ?
            markOneCompleted :
            markOneActive, args);
        }
      },

      keydown: {
        /**
         * Save edited item
         * @param {Event} e
         */
        '.edit': (e) => {
          if (e.keyCode === 13) {
            let attr = this.$context.attributes;
            this.$context.signal(todoItemOnEnter, {
              id: Number(attr['id']),
              value: e.currentTarget.value
            });
          }
        }
      }
    };
  }
}

module.exports = {
  constructor: TodoItem
};
