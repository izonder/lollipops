const path = require('path'),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',

    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        path.resolve('./src/index')
    ],

    output: {
        filename: '[name].[hash].min.js',
        path: path.resolve('./dist'),
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(jpg|png|gif|mp3|aac|ogg)$/,
                loader: 'file-loader'
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader'
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                autoprefixer()
                            ]
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },

    resolve: {
        alias: {
            actions: path.resolve('./src/actions'),
            assets: path.resolve('./src/assets'),
            components: path.resolve('./src/components'),
            configs: path.resolve('./src/configs'),
            containers: path.resolve('./src/containers'),
            core: path.resolve('./src/core'),
            layouts: path.resolve('./src/layouts'),
            middleware: path.resolve('./src/middleware'),
            reducers: path.resolve('./src/reducers')
        },
        extensions: [
            '.js'
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve('./src/assets/index.html'),
            favicon: path.resolve('./src/assets/favicon.ico'),
            filename: path.resolve('./dist/index.html')
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'DEV_TOOL': JSON.stringify(process.env.DEV_TOOL || 'disable')
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        contentBase: path.resolve('./dist'),
        host: '0.0.0.0',
        port: 9000,
        publicPath: '/',
        compress: true,
        hot: true,
        historyApiFallback: true
    }
};
