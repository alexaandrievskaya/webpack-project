const path = require('path');

//module импортирует из библиотеки webpack из node_modules, exports - переаем обьект конфигурации
module.exports = {
    entry: './src/index.js', //точка входа
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist') //системный путь к текущему каталогу
    }
}