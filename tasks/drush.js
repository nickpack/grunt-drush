/*
 * grunt-drush
 * https://github.com/nickpack/grunt-drush
 *
 * Copyright (c) 2013 Nick Pack
 * Licensed under the MIT license.
 */

 'use strict';

 module.exports = function(grunt) {

  var fs   = require('fs'),
  path = require('path');
  var _ = grunt.util._;
  var helpers = require('grunt-lib-contrib').init(grunt);
  var self = this;

  grunt.registerMultiTask('drush', 'Drush task runner for grunt.', function() {
    var cb = this.async();
    var options = this.options();
    var args;

    grunt.verbose.writeflags(options, 'Options');

    grunt.util.async.forEachSeries(this.files, function(f, next) {
      args = [].concat(f.args);

      if (f.dest !== 'undefined') {
        args.push(f.dest);
      }

      var origCwd = process.cwd();
      if (f.cwd) {
        grunt.file.setBase(f.cwd);
      }

      var drush = grunt.util.spawn({
        cmd: 'drush',
        args: args
      }, function(error, result, code) {
        if (code === 127) {
          return grunt.warn(
            'You need to have drush installed and in your PATH for\n' +
            'this task to work.'
            );
        }
        next(error);
      });

      drush.stdout.pipe(process.stdout);
      drush.stderr.pipe(process.stderr);

      grunt.file.setBase(origCwd);
    }, cb);
  });
};