const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

const IS_DEV_SERVER = !!process.env.WEBPACK_DEV_SERVER;

module.exports = (env) => {
  const IS_DEV_MODE   = env.development === true || IS_DEV_SERVER;
  const IS_PROD_MODE  = env.production === true;

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
      home: path.resolve(__dirname, '../my_app/static/my_app/index'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'), // Should be in STATICFILES_DIRS
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
