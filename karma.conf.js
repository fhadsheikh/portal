
//jshint strict: false
module.exports = function(config) {
  config.set({

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-ui-router/release/angular-ui-router.min.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'app/**/*.*.js',
      'app/**/*.*.*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['PhantomJS'],

    plugins: [
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-jasmine',
    ]

  });
};