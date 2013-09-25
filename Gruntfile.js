/*jshint node:true*/
/**
 * Usage
 *
 * $ npm install
 * $ grunt jshint
 *
**/
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /* lint */
        jshint: {
            all: ['*.js', 'plugins/**/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
};
