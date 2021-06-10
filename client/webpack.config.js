const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

let mode = "development";
let target = "web";

if (process.env.NODE_ENV === "production") {
	mode = "production";
	target = "browserslist";
}
const plugins = [
	new CleanWebpackPlugin(),
	new MiniCssExtractPlugin(),
	new HtmlWebpackPlugin({
		template: "./src/index.html",
	}),
	mode === "development" && new ReactRefreshWebpackPlugin(),
].filter(Boolean);

// if (process.env.SERVE) {
// 	plugins.push(new ReactRefreshWebpackPlugin());
// }

module.exports = {
	mode: mode,
	target: target,

	entry: "./src/index.js",

	output: {
		path: path.resolve(__dirname, "dist"),
		assetModuleFilename: "images/[hash][ext][query]",
	},

	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				type: "asset",
				// parser: {
				// 	dataUrlCondition: {
				// 		maxSize: 30 * 1024,
				// 	},
				// },
			},
			{
				test: /\.(s[ac]|c)ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: { publicPath: "" },
					},
					"css-loader",
					"postcss-loader",
					"sass-loader",
				],
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						plugins: [
							// this code will evaluate to "false" when
							// "isDevelopment" is "false"
							// otherwise it will return the plugin
							mode === "development" &&
								require("react-refresh/babel"),
							// this line removes falsy values from the array
						].filter(Boolean),
					},
				},
			},
		],
	},

	plugins,

	resolve: {
		extensions: [".js", ".jsx"],
	},

	devtool: "source-map",
	devServer: {
		contentBase: "./dist",
		hot: true,
	},
};
