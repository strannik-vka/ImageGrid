let mix = require('laravel-mix');

mix.options({
    legacyNodePolyfills: false
}).setPublicPath('dist');

mix.js('./test/index.js', '/test');