const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { type } = require('os');

module.exports = {
    entry: {
        index: './src/js/index.js' 
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Library',
            template: './src/index.html' 
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpe?g|png|webp|avif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        open: true
    }
};
