const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //это метод, нужно деструктуризацию
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
console.log('IS DEV:', isDev);
console.log('IS PROD:', isProd);

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }];

    if (isDev) {
        loaders.push('eslint-loader')
    }

    return loaders;
};

const optimization = () => {
    const config = {
        splitChunks: {
        chunks: 'all'
        }
    };

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin({
                cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            }
            }),
        new TerserWebpackPlugin()
        ]
    }
        return config;
};

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const cssLoaders = (extra) => {
    const loaders = [
        {
        loader: MiniCssExtractPlugin.loader,
        options: {
            hmr: isDev,
            reloadAll: true
        }
        },
        'css-loader'
    ];
    if (extra) {
    loaders.push(extra);
    }
    return loaders;
};

const babelOptions = (preset) => {
    const options = {
    presets: [
        '@babel/preset-env',
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties'
    ]
    };
    if (preset) {
        options.presets.push(preset);
    }

    return options;
};

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
            from: path.resolve(__dirname, 'src/favicon.png'),
            to: path.resolve(__dirname, 'dist'),
            }]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ];
        if (isProd) {
        base.push(new WebpackBundleAnalyzer());
        }

    return base;
};

//module импортирует из библиотеки webpack из node_modules, exports - переаем обьект конфигурации
module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.jsx', //точка входа
        stat: './statistics.ts',
    },
    output: {
        filename: '[name].[hash].js', //будут подставляться названия точек входа
        path: path.resolve(__dirname, 'dist') //системный путь к текущему каталогу
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js', '.json', '.png'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@model': path.resolve(__dirname, 'src/model'),
            '@css': path.resolve(__dirname, 'src/css'),
            '@assets': path.resolve(__dirname, 'src/assets')
        },
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev,
        contentBase: path.join(__dirname, 'src'),
        watchContentBase: true
    },
    devtool: isDev ? 'source-map' : '',
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-react')
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/ ,
                loader: {
                    loader: 'babel-loader' ,
                    options: babelOptions('@babel/preset-typescript')
                }
            },
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader'],
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        hmr: isDev,
                        reloadAll: true
                        }
                    },
                    'csv-loader'],
            }   
        ] //содержит описание определённых типов лоадеров
    },
};


    
