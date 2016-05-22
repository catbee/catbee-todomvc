class Head {
  template (ctx) {
    return `
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>${ctx.title || ''} • TodoMVC</title>
      <link rel="stylesheet" href="/bundle.css">
    `
  }

  render () {
    return this.$context.getWatcherData();
  }
}

module.exports = {
  constructor: Head
};
