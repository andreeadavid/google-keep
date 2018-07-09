const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        "./style.scss"
    ],
    devServer: {
        contentBase: './',
        compress: true,
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(html)$/,
                use: {
                  loader: 'html-loader',
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['babel-preset-env'],
                    plugins: [require('babel-plugin-transform-object-rest-spread')],
                  },
                }
              },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        })
    ]
};