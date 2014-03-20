# grunt-drush

> Stupidly simple Drush task runner for grunt.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-drush --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-drush');
```

## The "drush" task

### Overview
In your project's Gruntfile, add a section named `drush` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  drush: {
    your_target: {
      args: [],
      dest: 'path/if/required/for/task'
    },
  },
})
```

### Example - Installing a fresh drupal install with some modules
```js
grunt.initConfig({
    drush: {
      install: {
        args: ['make', 'example/core.make'],
        dest: 'src'
      }
    },
})
```

## TODO
* Expand the functionality to do something more useful
* Tests
* Find a solution to using this.files for the config objects

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 0.0.2 - @randallknutson Added the ability to specify the cwd
* 0.0.1 - Initial hack together
