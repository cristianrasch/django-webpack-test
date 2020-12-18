const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = (env) => {
  const IS_PROD_MODE = env.NODE_ENV === "development";

  return {
    mode: IS_PROD_MODE ? 'production' : 'development',
    resolve: {
      modules: [path.resolve(__dirname, 'node_modules')],
      extensions: ['.js', '.vue'],
      alias: {
        'vue': '@vue/runtime-dom'
      }
    },
    entry: {
      my_app__home: path.resolve(__dirname, 'my_app/static/my_app/index'),
    },
    output: {
      path: path.resolve(__dirname, 'static/dist'), // Should be in STATICFILES_DIRS
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
          test: /\.vue$/,
          loader: 'vue-loader'
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ]
  };
}
