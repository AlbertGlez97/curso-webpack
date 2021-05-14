const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },

    mode: 'development',
    watch: true,

    resolve:{
        extensions:['.js'],
        alias: {
          /*'@nombreDeAlias': path.resolve(__dirname, 'src/<directorio>'),*/
          '@utils': path.resolve(__dirname,'src/utils/'),
          '@templates': path.resolve(__dirname,'src/templates/'),
          '@styles': path.resolve(__dirname,'src/styles/'),
          '@images': path.resolve(__dirname,'src/assets/images/'),

        }

    },
    module: {
        rules: [
          {
            test: /\.(css|styl)$/i,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
            ]
          },
          {
            test: /\.png/,
            type: "asset/resource"
          },
          {
            test: /\.(woff|woff2)$/,
            use: {
              loader: "url-loader",
              options: {
                // limit => limite de tamaño
                limit: 10000,
                // Mimetype => tipo de dato
                mimetype: "application/font-woff",
                // name => nombre de salida
                name: "[name].[contenthash].[ext]",
                // outputPath => donde se va a guardar en la carpeta final
                outputPath: "./assets/fonts/",
                publicPath: "../assets/fonts/",
                esModule: false,
              }
            }
          },
          {
            // Test declara que extensión de archivos aplicara el loader
            test: /\.js$/,
            // Use es un arreglo u objeto donde dices que loader aplicaras
            use: {
              loader: "babel-loader"
            },
            // Exclude permite omitir archivos o carpetas especificas
            exclude: /node_modules/
          }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({ // CONFIGURACIÓN DEL PLUGIN
            inject: true, // INYECTA EL BUNDLE AL TEMPLATE HTML
            template: './public/index.html', // LA RUTA AL TEMPLATE HTML
            filename: './index.html' // NOMBRE FINAL DEL ARCHIVO
        }),
        new MiniCssExtractPlugin({
          filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, "src", "assets/images"),
              to: "assets/images"
            }
          ]
        }),
        new Dotenv(), 
    ],
}