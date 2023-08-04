const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

let outputdir = path.resolve('dist');

const getHtmlPlugins = (chunks) => {
  return chunks.map(x => new HtmlPlugin({
    title: 'React Extension',
    filename: `${x}.html`,
    chunks: [x]
  }))
}

module.exports = {
  mode: 'development',
  entry: {
    popup: path.resolve('src/popup/popup.tsx'),
    options: path.resolve('src/options/options.tsx'),
    background: path.resolve('src/background/background.ts'),
    contentScript: path.resolve('src/contentScript/contentScript.ts')
  },
  module: {
    rules: [
      {
        use: 'ts-loader',
        test: /\.tsx?$/,
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      outputPath: outputdir
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('src/static'),
          to: outputdir
        }
      ]
    }),
    ...getHtmlPlugins(['popup', 'options'])
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].js',
    path: outputdir,
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}
