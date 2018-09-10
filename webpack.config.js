const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './dist'
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: "./jquery-3.3.1.min",
            jQuery: "./jquery-3.3.1.min"
        })
    ]
};
