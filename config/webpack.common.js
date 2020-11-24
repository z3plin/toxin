const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const htmlPlugins = require('./utils/htmlPlugins')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
    src: path.resolve(__dirname, '../src'),
    build: path.resolve(__dirname, '../dist'),
    public: path.resolve(__dirname, '../public')
}

module.exports = {
    externals: {
        paths: PATHS
    },

    entry: {
        main: `${PATHS.src}/js/index.js`
    },

    output: {
        path: PATHS.build,
        filename: '[name].js',
        publicPath: '/'
    },

    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: PATHS.public,
                    to: '../dist/assets',
                    globOptions: {
                        ignore: ['*.DS_Store'],
                    },
                    force: true
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new HtmlWebpackPlugin({
            favicon: PATHS.src + '/images/favicon/favicon.png',
        }),
        ...htmlPlugins,
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    {loader: 'css-loader', options: {sourceMap: true, importLoaders: 1}},
                    {loader: 'postcss-loader', options: {sourceMap: true}},
                    {loader: 'sass-loader', options: {sourceMap: true}},
                ],
            },
            {
                test: /\.pug$/,
                use: ['pug-loader'],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline'
            }
        ],
    },

    resolve: {
        alias: {
            modules: path.resolve(__dirname, '../src/blocks/modules'),
            components: path.resolve(__dirname, '../src/blocks/components')
        }
    },
}