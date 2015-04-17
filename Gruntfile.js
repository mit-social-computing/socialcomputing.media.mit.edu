/*jshint laxcomma:true*/
var jsFiles = [
    'source/bower_components/modernizr/modernizr.build.js'
    , 'source/bower_components/jquery/dist/jquery.js'
    , 'source/bower_components/imagesloaded/imagesloaded.pkgd.js'
    , 'source/bower_components/slick-carousel/slick/slick.js'
    //, 'source/bower_components/packery/dist/packery.pkgd.js'
    //, 'source/bower_components/isotope/dist/isotope.pkgd.js'
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
                files : jsFiles,
                tasks : [ 'concat:js', 'uglify:dev' ]
            },
            css : {
                files : [
                    'public/assets/css/styles.css'
                ],
                tasks : [ 'cssmin:dev' ]
            }
        },
        concat : {
            js : {
                files : {
                    'public/assets/js/scripts.concat.js' : jsFiles
                }
            },
            css : {
                files : {
                    'public/assets/css/styles.concat.css' : [
                        'public/assets/css/styles.css'
                        , 'source/bower_components/slick-carousel/slick/slick.css'
                    ]
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
                sassPath : 'source/sass',
                cssPath : 'public/assets/css',
                imagesDir : 'assets/img',
                fontsPath : 'public/assets/css/fonts',
                fontsDir : 'assets/css/fonts',
                require : ['compass-h5bp', 'compass-normalize'],
                output: 'expanded'
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
                files: {
                    'public/assets/css/styles.min.css' : [ 'public/assets/css/styles.css' ]
                }
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
