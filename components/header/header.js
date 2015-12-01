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
      let value = e.currentTarget.elements[0].value;
      this.$context.signal('addNewTodo', { value });
  }
}

module.exports = Header;
