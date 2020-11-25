const path = require('path')
const htmlPlugins = require('./utils/htmlPlugins')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

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
        publicPath: '/'
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
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(s[ac]ss|css)$/i,
                use: [
                    'style-loader',
                    {loader: 'css-loader', options: {sourceMap: true, importLoaders: 2}},
                    {
                        loader: 'postcss-loader', 
                        options: {
                            sourceMap: true,
                        }
                    },
                    {loader: 'sass-loader', options: {sourceMap: true}},
                ],
            },
            {
                test: /\.pug$/,
                use: ['pug-loader'],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/i,
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