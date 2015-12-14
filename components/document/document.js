/**
 * Document component
 */
class Document {
  bind () {
    this.$context.signal('appReady');
    return {
      click: {
        /**
         * Cancel editing item
         * @param {object} e
         */
        body: (e) => {
          if (e.target.className != 'edit') {
            this.$context.signal('cancelEditingTodo');
          }
        }
      }
    };
  }
}

module.exports = Document;
