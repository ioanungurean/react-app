const path = require('path');
const merge = require('webpack-merge');
const plugins = require('./webpack/plugins');

module.exports = (params) => {
  const config = {
    environment: (params && params.environment) ? params.environment : 'development',
    theme: (params && params.theme) ? params.theme : 'default',
    analysis: (params && params.analysis) ? params.analysis : false,
  };

  console.info('*** Environment', config.environment);
  console.info('*** Analysis', config.analysis);
  console.info('*** Theme', config.theme);

  return merge.smartStrategy({
      'module.rules.use': 'prepend',
    })({
    context: path.resolve('src'),

    mode: config.environment,

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.(css|scss)$/,
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: [
                  path.resolve('node_modules/xbem/src'),
                  path.resolve(`src/ui/layout`),
                  path.resolve(`src/ui/themes/${config.theme}`),
                  path.resolve(`src/ui/themes/${config.theme}/fonts`),
                  path.resolve(`src/ui/themes/${config.theme}/patterns`),
                ],
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|svg|gif|ico|ttf|woff|woff2|eot)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[hash].[ext]',
                outputPath: 'assets/',
              },
            },
          ],
        },
      ],
    },

    resolve: {
      extensions: ['.js', '.json', '.css', '.scss'],
      modules: [path.resolve('src'), 'node_modules'],
      alias: {
        components: path.resolve('src/components'),
        modules: path.resolve('src/modules'),
        utils: path.resolve('src/utils'),
      },
    },

    plugins: [
      plugins.HtmlWebpackPlugin,
    ],

    optimization: {
      splitChunks: {
          name: 'vendor',
          chunks: 'all',
      },
    },
  }, require('./webpack/' + config.environment)(config));
};
