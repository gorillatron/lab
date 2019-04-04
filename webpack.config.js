const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/app.ts',
    watchOptions: {
        aggregateTimeout: 100,
        poll: true
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/assets/'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node-modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, "./"),
        compress: true,
        port: 9000,
        inline: true,
        open: true
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
  }