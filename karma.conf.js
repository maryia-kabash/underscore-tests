var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};

module.exports = function(config) {
    config.set({
        files: [
            './node_modules/underscore/underscore.js',
            './node_modules/chai/chai.js',
            './tests/test.js'
        ],
        frameworks: ['mocha', 'chai-spies', 'chai'],

        preprocessors: {
            'tests/test.js': ['webpack']
        },

        reporters: ['spec', 'coverage'],

        coverageReporter: {
            type: 'html',
            dir: 'coverage-report/'
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: true
        },

        browsers: ['PhantomJS']
    });
};
