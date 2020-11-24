const paths = require('./paths')
const path = require('path')

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'development',

    devtool: 'inline-source-map',

    devServer: {
        historyApiFallback: true,
        // contentBase: paths.build,
        contentBase: path.resolve(__dirname, '../src'),
        watchContentBase: true,
        overlay: {
            warnings: true,
            errors: true
        },
        open: true,
        compress: true,
        hot: true,
        port: 9000,
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
})

