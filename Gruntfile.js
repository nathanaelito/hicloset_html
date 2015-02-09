/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        expand: true,
        cwd: 'src/js',
        src: '**/*.js',
        dest: 'bin/js'
      },
      mage: {
        expand: true,
        cwd: 'src/js',
        src: '**/*.js',
        dest: '../site/magento/skin/frontend/hicloset/default/js'
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,  
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    less: {
      development: {
        options: {
          paths: ["src/less"]
        },
        files: {
          "bin/css/main.css": "src/less/main.less",
          "../site/magento/skin/frontend/hicloset/default/css/styles.css": "src/less/main.less"
        }
      },
    },
    watch: {
      options:{
        livereload:9999
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lessfiles: {
        files: 'src/less/*.less',
        tasks: ['less']
      },
      jsfiles: {
        files:['src/js/*.js', 'src/js/**/*.js'],
        tasks:['uglify']
      },
      htmlfiles: {
        files:'bin/*.html'
      },
      cssfiles: {
        files:'bin/css/*.css'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  //grunt.registerTask('default', ['less', 'jshint', 'uglify']);
  grunt.registerTask('default', ['less','watch']);

};
