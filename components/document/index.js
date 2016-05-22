var { appReady } = require('../../signals/pageSignals');
var { cancelEditingTodo } = require('../../signals/todoSignals');
var { html } = require('common-tags');

/**
 * Document component
 */
class Document {
  template () {
    return html`
      <!DOCTYPE html>
      <html>
        <head></head>
        <body>
          <section class="todoapp">
            <cat-header>
            </cat-header>
          </section>
          <script src="/bundle.js"></script>
        </body>
      </html>
    `
  }

  bind () {
    this.$context.signal(appReady);

    return {
      click: {
        /**
         * Cancel editing item
         * @param {object} e
         */
        body: (e) => {
          if (e.target.className != 'edit') {
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
      component: require('../head'),
      watcher: {
        title: ['statements', 'title']
      }
    },
    {
      name: 'header',
      component: require('../header'),
      watcher: {
        header: ['statements', 'header']
      }
    }
  ]
};
