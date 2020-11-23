const paths = require('./paths')
const path = require('path')
const fs = require('fs')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PAGES_DIR = `${paths.src}/views/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
    entry: [paths.src + '/js/index.js'],

    output: {
        path: paths.build,
        filename: '[name].bundle.js',
        publicPath: '/'
    },

    plugins: [
        new CleanWebpackPlugin(),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.public,
                    to: '../dist/assets',
                    globOptions: {
                        ignore: ['*.DS_Store'],
                    },
                },
            ],
        }),

        new HtmlWebpackPlugin({
            favicon: paths.src + '/images/favicon/favicon.png',
        }),

        ...PAGES.map(page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/pages/${page}`,
            filename: `./${page.replace(/\.pug/, '.html')}`
        }))
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
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
                loader: 'pug-loader'
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
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
    }
}