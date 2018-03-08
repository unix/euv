const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    app: './examples/app.ts',
  },
  
  output: {
    path: `${__dirname}/../examples/dist`,
    filename: '[name].js',
  },
  
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
        },
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'ts-loader',
        ],
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
    ],
  },
  
  devServer: {
    historyApiFallback: true,
    host: '127.0.0.1',
  },
  
  devtool: 'cheap-module-eval-source-map',
  
  plugins: [
    new HtmlWebpackPlugin({ template: `${__dirname}/../examples/template.html` }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
    }),
  ],
}
