# grunt-drush

> Stupidly simple Drush task runner for grunt.

## Getting Started
This plugin requires Grunt `~0.4.5`

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

### Example - Run a command and surpress stdout
```js
grunt.initConfig({
    drush: {
      runserver: {
        args: ['runserver', '8080'],
        dest: 'src',
        options: {stdio: 'ignore'}
      }
    },
})
```


### Configurable options
#### cmd
Path to the drush executable (Optional) - PATH is used if not specified.

#### cwd
Sets the current working directory (Optional) - Usually the path to your drupal installation.

#### args
A list of arguments to pass over to drush (Required), a javascript array of command parts to call drush with.

```js
args: ['make', 'example/core.make']
```
#### options
A list of options to be passed to [child_process.spawn](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options) such as stdout/stderr, uid/gid, or environment variables.

```js
options: {stdio: 'ignore'}
```

#### src (Deprecated)
Supported only for backwards compatability, does nothing in the current release.

#### dest (Deprecated)
The destination directory for the drush task to be run in to, mainly useful for make.

## TODO
* Expand the functionality to do something more useful
* Tests

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 0.0.7 - @grayside Mirror debugging grunt options to drush, @mikeyp Allow options to be passed spawn.
* 0.0.6 - @chasingmaxwell fixed regressions caused by my previous refactor
* 0.0.5 - Refactored slightly to use newer tools, and resolve the original flaw whereby this.files was not populated if a src, or dest was not specified. Ability to specify the path to drush kindly added by @IslandUsurper
* 0.0.4 - @chasingmaxwell Fixed an oversight on the test if dest is undefined
* 0.0.3 - @thijsvdanker Removed deprecated contrib lib
* 0.0.2 - @randallknutson Added the ability to specify the cwd
* 0.0.1 - Initial hack together
