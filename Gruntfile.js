/*jshint laxcomma:true*/
var jsFiles = [
    'source/bower_components/jquery/dist/jquery.js'
    , 'js/src/main.js'
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
                tasks : ['watch', 'shell:watch'],
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
        cssmin : {
            options : {
                advanced : false
            },
            dev : {
                'public/assets/css/styles.min.css' : [ 'public/assets/css/styles.css' ]
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-shell')
    grunt.loadNpmTasks('grunt-concurrent')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-cssmin')

    grunt.registerTask('default', ['concurrent:target'])
}
