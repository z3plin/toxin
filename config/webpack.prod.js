const paths = require('./paths')
const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const cssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    output: {
        path: paths.build,
        publicPath: '/',
        filename: 'js/[name].[contenthash].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(s[ac]ss|css)$/i,
                include: [
                    path.resolve(__dirname, '../src/styles/main.scss')
                ],
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: false,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: false,
                            postcssOptions: {
                                config: path.resolve(__dirname, './utils/postcss.config.js'),
                            },
                        }
                    },
                    'sass-loader'
                ],
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
            chunkFilename: '[id].css',
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new cssMinimizerPlugin(), '...'],
        runtimeChunk: {
            name: 'runtime',
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
})