var webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot-loader!babel-loader'
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    proxy: {
    '/rxbackend/*': {
      target: 'http://localhost:8000/',
      secure: false,
      changeOrigin: true
    },
    '/accounts/*': {
      target: 'http://localhost:8000/',
      secure: false,
      changeOrigin: true
    }
  }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
