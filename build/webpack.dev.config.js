const path = require('path')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
    hot: true,
    open: true,
    inline: true,
  }
}