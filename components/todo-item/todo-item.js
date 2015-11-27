class TodoItem {
  render () {
    return this.$context.getWatcherData()
      .then(data => {
        console.log('render data fot todoItem');
        console.log(data);
      });
  }

  bind () {
    return {
      dblclick: {
        '.view': () => this.$context.signal('todoItemDoubleClick', { id: this.$context.attributes['cat-id'] })
      },

      click: {
        '.destroy': () => this.$context.signal('removeTodo', {id: this.$context.attributes['cat-id']})
      }
    }
  }
}

module.exports = TodoItem;
