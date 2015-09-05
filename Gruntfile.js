module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		jshint: {
    		files: ['Gruntfile.js', 'source/**/*.js'],
			options: {
				curly   : true,
				eqeqeq  : true,
				immed   : true,
				latedef : true,
				newcap  : true,
				noarg   : true,
				sub     : true,
				unused  : true,
				undef   : true,
				boss    : true,
				eqnull  : true,
				globals : {
					exports : true,
					module  : false
				},
				predef  :['document','window','alert','jQuery','setTimeout','prompt']
			}
		},

		concat : {
			dist: {
				files: { 'basecamp-ui-improvements.js': ['source/**/*.js'] }
			}
		},

		uglify: {
			all: {
				files: {
					'basecamp-ui-improvements.min.js': ['basecamp-ui-improvements.js'],
				},
				options: {
					mangle: false
				}
			}
		},

		exec: {
			bookmarklet: 'php ~/bookmarklets source bookmarklets',
		},

		watch: {
			js: {
				files: ['Gruntfile.js', 'source/**/*.js'],
				tasks: ['default'],
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-exec');

	grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'exec:bookmarklet']);
};
