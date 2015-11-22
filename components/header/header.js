class Header {
  render () {
    return this.$context.getWatcherData();
  }

  bind () {
    return {
      submit: {
        '#add-new-todo': this.addNewTodo
      }
    }
  }

  addNewTodo (e) {
    e.preventDefault();
    this.$context.signal('addNewTodo');
  }
}

module.exports = Header;
