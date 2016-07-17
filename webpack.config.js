module.exports = {
  entry: './browser.js',
  output: {
    path: './public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-template-loader'
      }
    ]
  },
  devtool: '#source-map'
};
