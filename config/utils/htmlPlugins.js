const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const getFilePath = require('./getFilePaths')

const pagesDir = path.resolve(__dirname, '../../src/views/pages')

let pugPages = []
let htmlPlugins = []

let pugPaths = getFilePath(pagesDir, '.pug')

pugPaths.map(item => {
    let page = {
        path: item,
        name: path.basename(item, path.extname(item))
    }
    pugPages.push(page)
})

pugPages.map(item => {
    htmlPlugins.push(
        new HtmlWebpackPlugin({
            template: item.path,
            filename: `${item.name}.html`
        })
    )
})

module.exports = htmlPlugins