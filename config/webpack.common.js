const path = require('path')
const htmlPlugins = require('./utils/htmlPlugins')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const PATHS = {
    src: path.resolve(__dirname, '../src'),
    build: path.resolve(__dirname, '../dist')
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
        publicPath: '/',
        assetModuleFilename: 'assets/[name][ext]'
    },

    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: `${PATHS.src}/images`,
                    to: '../dist/assets/images',
                    globOptions: {
                        ignore: ['*.DS_Store'],
                    },
                    force: true
                },
                {
                    from: `${PATHS.src}/fonts`,
                    to: '../dist/assets/fonts',
                    globOptions: {
                        ignore: ['*.DS_Store'],
                    },
                    force: true
                },
            ],
        }),
        new HtmlWebpackPlugin({
            favicon: PATHS.src + '/images/favicon/favicon.png',
        }),
        ...htmlPlugins,
        new MiniCssExtractPlugin({
            filename: 'main.css'
        })
    ],

    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(s[ac]ss|css)$/i,
                include: [
                    path.resolve(__dirname, '../src/styles/main.scss')
                ],
                use: [
                    'style-loader',
                    {loader: 'css-loader', options: {sourceMap: true, importLoaders: 2}},
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                config: path.resolve(__dirname, './utils/postcss.config.js'),
                            },
                        }
                    },
                    {loader: 'sass-loader', options: {sourceMap: true}},
                ],
            },
            {
                test: /\.pug$/i,
                use: ['pug-loader'],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/i,
                type: 'asset/inline',
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