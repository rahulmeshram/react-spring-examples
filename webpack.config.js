const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const fs = require('fs')

const createAlias = (name, fallback) =>
  fs.existsSync(`./../${name}`) ? path.resolve(`./../${name}`) : fallback || name

module.exports = mode => {
  return {
    mode,
    entry: 'index.js',
    output: { filename: 'bundle.js', path: path.resolve('./dist') },
    module: {
      rules: [
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        {
          test: /\.(js|jsx|tsx|ts)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    loose: true,
                    useBuiltIns: false,
                    targets: { browsers: 'last 2 Chrome versions' },
                  },
                ],
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
              plugins: [
                '@babel/plugin-syntax-dynamic-import',
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/proposal-class-properties', { loose: true }],
              ],
            },
          },
        },
      ],
    },
    resolve: {
      modules: [path.resolve('./'), 'node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        'react-spring$': createAlias('react-spring/src/targets/web', 'react-spring'),
        'react-spring/renderprops': createAlias('react-spring/src/renderprops/targets/web', 'react-spring/renderprops'),
        'react-spring/renderprops-addons': createAlias(
          'react-spring/src/renderprops/addons',
          'react-spring/renderprops-addons',
        ),
        react: path.resolve('node_modules/react'),
        'react-dom': path.resolve('node_modules/react-dom'),
        'prop-types': path.resolve('node_modules/prop-types'),
      },
    },
    plugins: [new HtmlWebpackPlugin({ template: 'template.html' })],
    devServer: {
      hot: false,
      contentBase: path.resolve('./'),
      stats: 'errors-only',
    },
    devtool: 'inline-source-map',
    performance: { hints: false },
  }
}
