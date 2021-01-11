const path = require('path');

module.exports = (env = {}) => {
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const { VueLoaderPlugin } = require('vue-loader');

  const IS_DEV_MODE = env.NODE_ENV === 'production' || process.env.WEBPACK_DEV_SERVER;

  return {
    mode: IS_DEV_MODE ? 'development' : 'production',
    devtool: IS_DEV_MODE ? 'eval-cheap-module-source-map' : 'source-map',
    resolve: {
      modules: [path.resolve(__dirname, 'node_modules')],
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue': '@vue/runtime-dom'
      }
    },
    entry: {
      app: path.resolve(__dirname, 'static/js/app'),
      my_app__home: path.resolve(__dirname, 'my_app/static/my_app/index'),
    },
    output: {
      // path: path.resolve(__dirname, 'public'), // Should be in STATICFILES_DIRS
      publicPath: '/static/', // Should match Django STATIC_URL
      filename: '[name].js', // No filename hashing, Django takes care of this
      chunkFilename: '[id]-[chunkhash].js', // Do have Webpack hash chunk filename
    },
    devServer: {
      writeToDisk: true, // Write files to disk in dev mode, so Django can serve the assets
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new VueLoaderPlugin(),
    ],
  };
}
