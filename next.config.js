module.exports = {
    reactStrictMode: true
}

const withCSS = require('@next/css');

module.exports = withCSS({
    cssLoaderOptions: {
        // Options here will be passed to css-loader
        url: false, // Disable URL handling by css-loader to prevent it from rewriting URLs
    },
});