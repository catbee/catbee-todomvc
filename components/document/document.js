class Document {
  bind () {
    this.$context.signal('appReady');
  }
}

module.exports = Document;
