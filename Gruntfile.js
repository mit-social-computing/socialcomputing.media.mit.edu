/*jshint laxcomma:true*/
var jsFiles = [
    'source/bower_components/modernizr/modernizr.build.js'
    , 'source/bower_components/jquery/dist/jquery.js'
    , 'source/js/**/*.js'
]

module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            reload : {
                files : [
                    'craft/templates/**/*.html'
                    , 'public/assets/js/scripts.concat.js'
                    , 'public/assets/css/styles.css'
                ],
                options : { livereload: true }
            },
            js : {
                files : [
                    'source/js/**/*.js'
                ],
                tasks : [ 'concat:js', 'uglify:dev' ]
            },
            css : {
                files : [
                    'public/assets/css/**/*.css'
                ],
                tasks : [ 'cssmin:dev' ]
            }
        },
        concat : {
            js : {
                files : {
                    'public/assets/js/scripts.concat.js' : jsFiles
                }
            }
        },
        concurrent : {
            target : {
                tasks : ['watch', 'compass:dev'],
                options : {
                    logConcurrentOutput : true
                }
            }
        },
        shell : {
            watch : {
                command : 'compass watch'
            }
        },
        uglify : {
            options : {
                sourceMap : true
            },
            dev: {
                files : {
                    'public/assets/js/scripts.min.js' : [ 'public/assets/js/scripts.concat.js' ]
                }
            },
            build : {
                options : {
                    drop_console : true
                },
                files : {
                    'public/assets/js/scripts.min.js' : [ 'public/assets/js/scripts.concat.js' ]
                }
            }
        },
        compass : {
            options : {
                sassDir : 'source/sass',
                cssDir : 'public/assets/css',
                require : ['compass-h5bp', 'compass-normalize'],
                output: 'expanded',
            },
            compile :  {
                options : {
                    watch : false
                }
            },
            dev : {
                options : {
                    watch : true
                }
            }
        },
        cssmin : {
            options : {
                advanced : false
            },
            dev : {
                'public/assets/css/styles.min.css' : [ 'public/assets/css/styles.css' ]
            }
        },
        modernizr : {
            dist : {
                devFile : 'source/bower_components/modernizr/modernizr.js',
                outputFile :  'source/bower_components/modernizr/modernizr.build.js',
                uglify : false,
                extra : {
                    shiv : false,
                    load : false
                },
                files : {
                    src : [
                        'source/js/**/*.js'
                        , 'source/sass/**/*.scss'
                    ]
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-concurrent')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-compass')
    grunt.loadNpmTasks('grunt-modernizr')

    grunt.registerTask('default', ['concurrent:target'])
}
