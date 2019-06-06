const path = require('path'),
    webpack = require('webpack'),
    autoprefixer = require('autoprefixer'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    {CleanWebpackPlugin} = require('clean-webpack-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',

    entry: [
        '@babel/polyfill',
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
                    MiniCssExtractPlugin.loader,
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
        new CleanWebpackPlugin({
            verbose: true,
            cleanOnceBeforeBuildPatterns: ['**/*', '!.readme.md']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve('./src/assets/index.html'),
            favicon: path.resolve('./src/assets/favicon.ico'),
            filename: path.resolve('./dist/index.html'),
            minify: {
                collapseWhitespace: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
                'DEV_TOOL': JSON.stringify('disable')
            }
        }),
        new MiniCssExtractPlugin({filename: '[name].[hash].min.css'})
    ],

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    mangle: false,
                    compress: true,
                    output: {
                        beautify: false,
                        comments: false
                    }
                }
            })
        ]
    }
};

