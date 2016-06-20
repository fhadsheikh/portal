module.exports = function(grunt){

    // Dev - Serve bower_component files with connect
    var serveStatic = require('serve-static');
    // Dev - Mod rewrite for pretty URLs
    var modRewrite = require('connect-modrewrite');

    var path = {
        dist: '.tmp',
        dev: 'app',
        server: 'localhost',
    }

    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            dist: {
                options: {
                    port: 9001,
                    hostname: path.server,
                    livereload:true,
                    base: path.dist,
                    middleware: function(connect){
                        return [
                            modRewrite(['^[^\\.]*$ /index.html [L]']),
                            connect().use('/bower_components', serveStatic('./bower_components')),
                            serveStatic(path.dist)
                        ];
                    }
                }
            },
            dev: {
                options: {
                    port: 9001,
                    hostname: path.server,
                    livereload:true,
                    base: path.dev,
                    middleware: function(connect){
                        return [
                            modRewrite(['^[^\\.]*$ /index.html [L]']),
                            connect().use('/bower_components', serveStatic('./bower_components')),
                            serveStatic(path.dev)
                        ];
                    }
                }
            }
        },

        clean: {
            dist: {
                src: [path.dist]
            }
        },

        wiredep: {
            dist: {
                src: ['app/index.html']
            }
        },

        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: path.dist
            }
        },

        compass: {
            dist: {
                options:{
                    sassDir: 'app/core/styles',
                    cssDir: 'app/core/styles'
                }
            }
        },
        
        copy: {
            dist: {
                src: 'app/index.html',
                dest: path.dist + '/index.html'
            }
        },

        ngtemplates: {
            dist:    {
                cwd: 'app',
                src: '**/*.html',
                dest: '.tmp/template.js',
                options: {
                    module: 'portal',
                    usemin: 'scripts/scripts.js'
                }
            }
        },

        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: path.dist + '/concat/scripts',
                    src: '*.js',
                    dest: path.dist + '/concat/scripts'
                }]
            }
        },

        usemin: {
            html: [path.dist + '/index.html'],
            css: [path.dist + '/styles/main.css']
        },

        filerev: {
            dist: {
                src: [
                    path.dist + '/scripts/*.js',
                    path.dist + '/styles/*.css'
                ]
            }
        },

        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep'],
            },
            views: {
                files: '**/*.*.html',
                options: {
                    livereload:true
                }
            },
            html: {
                files: '**/*.html',
                options: {
                    livereload:true
                }
            },
            js: {
                files: '**/*.*.js',
                options: {
                    livereload:true
                }
            },
            scss: {
                files: '**/*.scss',
                tasks: ['compass'],
                options: {
                    livereload:true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-filerev');

    grunt.registerTask('build', [
        'clean',
        'wiredep',
        'useminPrepare',
        'compass',
        'ngtemplates',
        'concat',
        'ngAnnotate',
        'copy',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'connect:dist',
        'watch'
    ]);

    grunt.registerTask('dev', [
        'compass',
        'connect:dev',
        'watch'
    ]);

}