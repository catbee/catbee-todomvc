/**
 * Todo item component
 */
class TodoItem {
  render () {
    return this.$context.getWatcherData();
  }

  bind () {
    return {
      dblclick: {
        /**
         * Edites item
         */
        '.view': () => {
          this.$context.signal('todoItemDoubleClick', { id: this.$context.attributes['cat-id'] });
        }

      },

      click: {
        /**
         * Removes item
         */
        '.destroy': () => {
          this.$context.signal('removeTodo', {id: this.$context.attributes['cat-id']});
        },
        /**
         * Toggle item as completed/not completed
         */
        '.toggle': () => {
          this.$context.signal('todoItemOnToggleCompleted', { id: this.$context.attributes['cat-id'] });
        }

      },

      keydown: {
        /**
         * Saves edited item
         * @param {object} e
         */
        '.edit': e => {
          if (e.keyCode == 13) {
            let attr = this.$context.attributes;
            this.$context.signal('todoItemOnEnter', { id: attr['cat-id'], value: e.currentTarget.value });
          }
        }

      }
    };
  }
}

module.exports = TodoItem;
