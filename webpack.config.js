const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/app.ts',
        imageProcesser: './src/imageProcessor.worker.ts'
    },
    watchOptions: {
        aggregateTimeout: 100,
        poll: true
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/assets/',
        globalObject: "this"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node-modules/
            },
            // {
            //     test: /\.worker\.ts$/i,
            //     exclude: /node_modules/,
            //     use: [
            //       'worker-loader?inline=true&publicPath=/assets/'
            //     ]
            // }
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