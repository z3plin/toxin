const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

const devConfig = {
    mode: 'development',

    devtool: 'inline-source-map',

    devServer: {
        historyApiFallback: true,
        contentBase: common.externals.paths.build,
        watchContentBase: true,
        overlay: {
            warnings: true,
            errors: true
        },
        open: true,
        compress: true,
        hot: true,
        port: 9000
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

const config = merge(common, devConfig)

module.exports = () => {
    return config
}