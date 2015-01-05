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
      spawn = require('win-spawn'),
      cmd = grunt.config('drush.cmd') || 'drush';

  grunt.registerMultiTask('drush', 'Drush task runner for grunt.', function() {
    var self = this,
        options = self.options(),
        args = self.data.args;

    var cb = this.async();

    grunt.verbose.writeflags(options, 'Options');


    var callDrush = function(args) {

      var origCwd = process.cwd(),
          drushResult = null;

      if (options.cwd) {
        grunt.file.setBase(options.cwd);
      }

      var cp = spawn(cmd, args, {stdio: 'inherit'});

      cp.on('error', grunt.warn);
      cp.on('close', function (code) {
        switch (code) {

          case 127:
            drushResult = grunt.fatal(
              'You need to have drush installed in your PATH\n' +
              'or set it in the configuration for this task to work.'
            );
            break;

          case 0:
            grunt.verbose.writeln('Drush completed without error');
            break;

          default:
            drushResult = grunt.warn('Drush failed: ' + code);
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
