// /*global jasmine, __karma__, window*/
Error.stackTraceLimit = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

__karma__.loaded = function () {
};

function isJsFile(path) {
  return path.slice(-3) == '.js';
}

function isSpecFile(path) {
  return /\.spec\.js$/.test(path);
}

function isBuiltFile(path) {
  var builtPath1 = '/base/app/';
  var builtPath2 = '/base/unit_tests/';
  return ((isJsFile(path) && (path.substr(0, builtPath1.length) == builtPath1)) ||
          (isJsFile(path) && (path.substr(0, builtPath2.length) == builtPath2)));
}

var allSpecFiles = Object.keys(window.__karma__.files)
  .filter(isSpecFile)
  .filter(isBuiltFile);

System.config({
  baseURL: '/base',
  packageWithIndex: true // sadly, we can't use umd packages (yet?)
});

System.import('systemjs.config.js')
  .then(function () {
    return Promise.all([
      System.import('@angular/core/testing'),
      System.import('@angular/platform-browser-dynamic/testing')
    ])
  })
  .then(function (providers) {
    var testing = providers[0];
    var testingBrowser = providers[1];

    testing.setBaseTestProviders(
      testingBrowser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
      testingBrowser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);

  })
  .then(function() {
    // Finally, load all spec files.
    // This will run the tests directly.
    return Promise.all(
      allSpecFiles.map(function (moduleName) {
        return System.import(moduleName);
      }));
  })
  .then(__karma__.start, __karma__.error);
