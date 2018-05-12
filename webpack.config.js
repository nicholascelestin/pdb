var path = require('path');

module.exports = {
    entry : './assets/js/components/main.js',
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path    : path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    node: {
        fs: "empty"
    }
};