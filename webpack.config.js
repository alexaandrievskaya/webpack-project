const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //это метод, нужно деструктуризацию

//module импортирует из библиотеки webpack из node_modules, exports - переаем обьект конфигурации
module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js', //точка входа
        stat: './statistics.js',
    },
    output: {
        filename: '[name].[contenthash].js', //будут подставляться названия точек входа
        path: path.resolve(__dirname, 'dist') //системный путь к текущему каталогу
    },
    plugins: [
        new HTMLWebpackPlugin({template: './index.html'}),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader'],
            }   
        ] //содержит описание определённых типов лоадеров
    },
};