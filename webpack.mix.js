let mix = require('laravel-mix');

mix.options({
    legacyNodePolyfills: false
}).setPublicPath('dist');

mix.js('./src/index.js', '/');