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
  var self = this;

  var cmd = grunt.config('drush.cmd') || 'drush';

  grunt.registerMultiTask('drush', 'Drush task runner for grunt.', function() {
    var options = this.options();
    var args = this.data.args;
    var callDrush = function(args) {
      var origCwd = process.cwd();
      if (options.cwd) {
        grunt.file.setBase(options.cwd);
      }

      var drush = grunt.util.spawn({
        cmd: cmd,
        args: args
      }, function(error, result, code) {
        if (code === 127) {
          return grunt.warn(
            'You need to have drush installed and in your PATH for\n' +
            'this task to work.'
          );
        }
      });

      drush.stdout.pipe(process.stdout);
      drush.stderr.pipe(process.stderr);

      grunt.file.setBase(origCwd);
    };

    if (this.files.length === 0) {
      callDrush(args);
    }
    else {
      this.files.forEach(function(file) {
        var fileArgs;

        if (typeof file.dest !== 'undefined') {
          fileArgs = args.concat([file.dest]);
        }

        callDrush(fileArgs);
      });
    }
  });
};
