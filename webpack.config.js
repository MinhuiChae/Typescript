var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    mode: 'development',
    entry: "/index.ts",
    module: {
    rules: [
        {
            test: /\.tsx?$/,
            use: "ts-loader",
            exclude: /node_modules/,
        },
        {
            test: /\.(sa|sc|c)ss$/,      
            use: [
             /* devMode ? 'style-loader' : */
             MiniCssExtractPlugin.loader,
             'css-loader',
             'sass-loader',
            ],
        },
    ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        port: 5000,
        hot:true,
    },
    plugins: 
    [
        new HtmlWebpackPlugin({ 
          template:"index.html"
        }), 
        new MiniCssExtractPlugin({
         filename: "[name].css",
         chunkFilename: "[id].css"
        })
    ]
};