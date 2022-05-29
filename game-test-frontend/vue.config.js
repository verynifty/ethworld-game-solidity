const webpack = require('webpack');

const ThreadsPlugin = require('threads-plugin')

module.exports = {
    configureWebpack: {
        resolve: {
            fallback: {
                assert: require.resolve('assert'),
                crypto: require.resolve('crypto-browserify'),
                http: require.resolve('stream-http'),
                https: require.resolve('https-browserify'),
                os: require.resolve('os-browserify/browser'),
                stream: require.resolve('stream-browserify'),
            },
        },
        plugins: [
            // Work around for Buffer is undefined:
            // https://github.com/webpack/changelog-v5/issues/10
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            }),
            new webpack.ProvidePlugin({
                process: 'process/browser',
            })
        ],
    }
}