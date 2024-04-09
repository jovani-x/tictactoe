const path = require("path");
const webpack = require("webpack");

module.exports = {
	entry: "./src/index.js",
	mode: "development",
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				loader: "babel-loader",
				options: { presets: ["@babel/env"] }
			},
			{
				test: /\.(css|scss)$/,
				use: [
					{
						loader: "style-loader",
					}, {
						loader: "css-loader",
						options: {
							sourceMap: process.env.NODE_ENV !== 'production',
						},
					}, {
						loader: 'sass-loader',
						options: {
							sourceMap: process.env.NODE_ENV !== 'production',
						},
					}
				]
			}
		]
	},
	resolve: { extensions: ["*", ".js", ".jsx"] },
	output: {
		path: path.resolve(__dirname, "dist/"),
		publicPath: "/dist/",
		filename: "bundle.js"
	},
	devServer: {
		// static: path.join(__dirname, "public/"),
		static: path.join(__dirname, "dist/"),
		port: 3001,
		devMiddleware: {
			publicPath: "http://localhost:3001/dist/"
		},
		hot: 'only',
		open: true
	},
	plugins: [new webpack.HotModuleReplacementPlugin()]
};