var path = require("path")

module.exports = {
	mode: "development",
	// devtool: "inline-source-map",
	entry: "./app.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "app.js",
	},
	devServer: {
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
		],
	},
}
