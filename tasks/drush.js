/*
 * grunt-drush
 * https://github.com/nickpack/grunt-drush
 *
 * Copyright (c) 2013 Nick Pack
 * Licensed under the MIT license.
 */

 'use strict';

 module.exports = function(grunt) {

  var _ = require('lodash'),
      fs = require('fs'),
      path = require('path'),
      cmd = grunt.config('drush.cmd') || 'drush';

  grunt.registerMultiTask('drush', 'Drush task runner for grunt.', function() {
    var self = this,
        options = self.options(),
        args = self.data.args;

    grunt.verbose.writeflags(options, 'Options');

    var callDrush = function(args) {

      var origCwd = process.cwd();

      if (options.cwd) {
        grunt.file.setBase(options.cwd);
      }

      var drush = grunt.util.spawn({
        cmd: cmd,
        args: args
      }, function(error, result, code) {

        var drushResult;

        if (result.stderr.length) {
          grunt.log.error(result.stderr);
        }

        if (result.stdout.length) {
          grunt.log.info(result.stdout);
        }

        switch (code) {

          case 127:
            drushResult = grunt.warn(
              'You need to have drush installed in your PATH\n' +
              'or set it in the configuration for this task to work.'
            );
            break;

          case 0:
            drushResult = grunt.info(
              'Drush executed without an error.'
            );
            break;

          default:
            drushResult = grunt.error('Drush failed: ' + code);
            break;
        }

        return drushResult;

      });

      grunt.file.setBase(origCwd);

    };

    var processFiles = function() {
      self.files.forEach(function(file) {
        var fileArgs;

        if (_.isString(file.dest)) {
          //fileArgs = args.push(file.dest);
          fileArgs = args.concat([file.dest]);
        }

        callDrush(fileArgs);
      });
    };

    if (_.isArray(this.files)) {
      processFiles();
    } else {
      callDrush(args);
    }

  });

};
