Package.describe({
  name: "raix:famono",
  version: '0.9.16',
  summary: 'Library bundler supports use of libraries like Famous, via git/bower and requireJS/commonJS/AMD/UMD'
});

// Package.registerBuildPlugin
Package._transitional_registerBuildPlugin({
  name: 'compileRequirejs',
  use: [ 'underscore' /*, 'raix:famono-binary-deps'*/ ],
  sources: [
    'binaries.build.js', /* included binaries */
    'compile_requirejs.js' // The holy grail!!
  ],
  npmDependencies: {
    'sync-exec': '0.3.2', // exec sync - we could also just run in a fiber?
    'famono': '0.0.9', // Our way of to require famono_lib.js
    // My sweet non binary chokidar :)
    'chokidar': 'https://github.com/raix/chokidar/tarball/53bdc584bcabb8a132be7292026c95888554aca4' // For watching local files.. 0.8.2
  }  
});

/* included binaries */
Npm.depends({
  send: '0.1.4', // Serving library files async / lazyloading
  useragent: "2.0.7", // Ment for client specific bundles?
});

Package.on_use(function(api) {

  if (api.versionsFrom) api.versionsFrom('METEOR@0.9.4');

  api.use('webapp', 'server');  // Used for serving files
  api.use('reload', 'client'); // Not sure if we are using this?
  api.use('routepolicy', 'server'); // Not sure if this is used...

  api.addFiles('binaries.js', 'server'); /* included binaries */
  // api.use('raix:famono-binary-deps@1.0.3', 'server'); // Binary deps

  api.add_files([
    // Just noop server-side api warning if used on server
    'requirejs_server.js',
    // The library lazyloading server
    'requirejs_libraries_server.js'
  ], 'server');

  // This is browser client side require / define api
  api.add_files('requirejs_client.js', 'client');

  // api.export('define');
  // api.export('require');
  api.export('Famono');
});