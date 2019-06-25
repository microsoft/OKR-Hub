const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const mode = "development";
const sourcemap = mode === "development";
const plugins = [
	new CopyWebpackPlugin([{
			from: "./node_modules/vss-web-extension-sdk/lib/VSS.SDK.min.js",
			to: "libs/VSS.SDK.min.js"
		},
		{
			from: "./node_modules/react/umd/react.production.min.js",
			to: "react.js"
		},
		{
			from: "./node_modules/react-dom/umd/react-dom.production.min.js",
			to: "react-dom.js"
		},
		{
			from: "./src/okr-hub.html",
			to: "./"
		}
	])
];

module.exports = {
	entry: {
		OKRHub: './src/OKRHub.tsx'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		libraryTarget: 'umd',
		library: "[name]"
	},
	devtool: "source-map",
	mode: mode,
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	module: {
		rules: [{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [{
					loader: "ts-loader"
				}]
			},
			{
				enforce: "pre",
				test: /\.js$/,
				use: [{
					loader: "source-map-loader"
				}]
			},
			{
				test: /\.css$/,
				use: [{
					loader: 'style-loader!css-loader?modules'
				}]
			},
			{
				test: /\.(scss)$/,

				use: [{
						loader: 'style-loader',
						options: {
							sourcemap: sourcemap
						}
					}, {
						loader: 'css-loader',
						options: {
							sourcemap: sourcemap
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourcemap: sourcemap
						}
					}
				]
			}

		]
	},
	externals: [{
			"react": true,
			"react-dom": true,
		},
		/^VSS\//,
		/^TFS\//
	],

	plugins: plugins
};