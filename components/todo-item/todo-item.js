class TodoItem {
  render () {
    return this.$context.getWatcherData();
  }

  bind () {
    return {
      dblclick: {

        '.view': () => this.$context.signal('todoItemDoubleClick', { id: this.$context.attributes['cat-id'] })

      },

      click: {

        '.destroy': () => {
          this.$context.signal('removeTodo', {id: this.$context.attributes['cat-id']});
        },

        '.toggle': () => {
          this.$context.signal('todoItemOnToggleCompleted', { id: this.$context.attributes['cat-id'] });
        }

      },

      keydown: {

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
