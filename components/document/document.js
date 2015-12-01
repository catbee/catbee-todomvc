class Document {
  bind () {
    this.$context.signal('appReady');

    return {
      click: {
        body: (e) => {
          if (e.target.className != 'edit') {
            this.$context.signal('clickOnPage');
          }
        }
      }
    };
  }
}

module.exports = Document;
