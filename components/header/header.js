/**
 * Header component
 */
class Header {
  render () {
    return this.$context.getWatcherData();
  }

  bind () {
    return {
      /**
       * Submit new item
       */
      submit: {
        '#add-new-todo': this.addNewTodo
      }
    };
  }

  /**
   * Adds new item
   * @param {object} e
   */
  addNewTodo (e) {
    e.preventDefault();
    let value = e.currentTarget.elements[0].value;
    this.$context.signal('addNewTodo', { value });
  }
}

module.exports = Header;
