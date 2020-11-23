const paths = require('./paths')
const path = require('path')
const fs = require('fs')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

const pages_dir = `${paths.src}/views/pages/`
// const pages = fs.readdirSync(pages_dir).filter(fileName => fileName.endsWith('.pug'))
const pages = fs
    .readdirSync(path.resolve(__dirname, '../src/views/pages/'))
    .filter(filename => filename.endsWith('.pug'))

module.exports = {
    entry: [paths.src + '/js/index.js'],

    output: {
        path: paths.build,
        filename: '[name].bundle.js',
        publicPath: '/'
    },

    plugins: [
        new CleanWebpackPlugin(),

        new CaseSensitivePathsPlugin(),

        new copyWebpackPlugin({
            patterns: [
                {
                    from: paths.public,
                    to: '../dist/assets',
                    globOptions: {
                        ignore: ['*.DS_Store'],
                    },
                    force: true
                },
            ],
        }),

        new htmlWebpackPlugin({
            favicon: paths.src + '/images/favicon/favicon.png',
        }),

        // new htmlWebpackPlugin({
        //     template: pages_dir + 'index.pug',
        //     filename: "index.html"
        // }),

        // ...pages.map(page => new htmlWebpackPlugin({
        //     template: `${pages_dir}/${page}`,
        //     filename: `./${page.replace(/\.pug/, '.html')}`
        // })),

        ...pages.map(page => new htmlWebpackPlugin({
            template: page,
            filename: page.replace(/\.pug/, '.html')
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
    }
}