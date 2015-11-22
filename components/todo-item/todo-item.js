class TodoItem {
  render () {
    return this.$context.getWatcherData();
  }

  bind () {
    return {
      dblclick: {
        '.view': () => this.$context.signal('todoItemDoubleClick', { id: this.$context.attributes['cat-id'] })
      }
    }
  }
}

module.exports = TodoItem;
