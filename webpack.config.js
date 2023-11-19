const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

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
                        ['@babel/preset-env'],
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
                {
                    loader: 'file-loader',
                    options: {
                        name: "[contenthash].[ext]",
                        outputPath: "../assets/"
                    }
                },
                {
                    loader: 'image-webpack-loader',
                    options: {
                        svgo: {
                            options: {
                                inlineStyles: true,
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
        }]
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
    ],
    optimization: {
        nodeEnv: "production",
        chunkIds: "total-size",
        moduleIds: "size",
        removeAvailableModules: true,
        minimize: true,
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                terserOptions: {
                    compress: {
                        warnings: false,
                        drop_console: true,
                        unsafe: true
                    },
                    output: {
                        comments: false
                    }
                },
                extractComments: false
            }),
            new ImageMinimizerPlugin({
                include: /\.(png|jpe?g|gif|svg)$/i,
                minimizer: {
                    implementation: ImageMinimizerPlugin.svgoMinify,
                    options: {
                        encodeOptions: {
                            multipass: true,
                            plugins: [{
                                name: "preset-default",
                                params: {
                                    overrides: {
                                        inlineStyles: {
                                            onlyMatchedOnce: false
                                        }
                                    }
                                }
                            },
                                "removeStyleElement"
                            ]
                        }
                    }
                }
            })
        ]
    }
};
