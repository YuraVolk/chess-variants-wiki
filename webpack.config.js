const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const productionMode = process.env.NODE_ENV === "production";
const devMode = !productionMode;

module.exports = {
    devtool: 'source-map',
    output: {
        filename: 'react-app.js'
    },
    module: {
        rules: [{
            test: /\.(?:js|mjs|cjs)|(?:ts|tsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', { "targets": ">0.5%, since 2017" }], 
                        '@babel/preset-react', 
                        ['@babel/preset-typescript', {
                            allowDeclareFields: true,
                            dts: true,
                            optimizeConstEnums: true
                        }]
                    ], plugins: [["@babel/plugin-proposal-decorators", { "version": "legacy" }]]
                }
            }
        }, {
            test: /\.module\.s(a|c)ss$/,
            sideEffects: true,
            use: [
                devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: "[name]-[local]"
                        },
                        sourceMap: devMode,
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: devMode
                    }
                }
            ]
        }, {
            test: /\.s(a|c)ss$/,
            sideEffects: true,
            exclude: /\.module.(s(a|c)ss)$/,
            use: [
                devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: devMode
                    }
                }
            ]
        }, {
            test: /\.css$/,
            sideEffects: true,
            exclude: /\.module.(s(a|c)ss)$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.(png|jpe?g|gif|svg)$/i,
            use: [
                'file-loader',
                {
                    loader: 'image-webpack-loader',
                    options: {
                        svgo: {
                            options: {
                                convertStyleToAttrs: true,
                                prefixIds: true
                            }
                        }
                    }
                },
            ],
        },
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
        {
            test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '../fonts/'
                    }
                }
            ]
        }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
        plugins: [new TsconfigPathsPlugin()]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: devMode ? "[name].css" : "[name].[hash].css",
            chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
        })
    ]
};
