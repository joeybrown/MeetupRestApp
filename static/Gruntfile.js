module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';',
                stripBanners: false
            },
            dist: {
                src: [
                    'js/jquery/**/*.js',
                    'js/bootstrap/**/*.js',
                    'js/angular/**/*.js',
                    'angular/**/*.js'
                ],
                dest: 'js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    'js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        less: {
            production: {
                files: {
                    'css/<%= pkg.name %>.css': 'less/theme.less'
                }
            }
        },
        cssmin: {
            compress: {
                files: {
                    'css/<%= pkg.name %>.min.css': 'css/<%= pkg.name %>.css'
                }
            }
        },
        watch: {
            less: {
                files: 'less/**/*.less',
                tasks: ['less:production', 'cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['concat:dist', 'uglify', 'less', 'cssmin']);

};