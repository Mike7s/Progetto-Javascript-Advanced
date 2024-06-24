const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { type } = require('os');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        index: './src/js/index.js' 
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Library',
            template: './src/index.html',
            favicon: './src/img/favicon.ico'

        }),
        new CopyWebpackPlugin({ 
            patterns: [ 
             
             { from: './src/img/favicon.ico',
                 to: 'icons'
              }, 
            
            ]
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
        static: path.resolve(__dirname, 'public'),
        open: true
    }
};
