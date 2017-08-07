const webpack = require("webpack");

module.exports = {
    entry: "./src/js/main.js",
    output: {
        path: `${__dirname}/public/js`,
        filename: "app.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};
