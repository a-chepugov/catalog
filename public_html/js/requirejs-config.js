'use strict';

requirejs.config({
//    baseUrl: "./js",

    paths: {
	jquery: '../bower_components/jquery/dist/jquery',
	underscore: '../bower_components/underscore/underscore-min',
	backbone: '../bower_components/backbone/backbone-min'
    },
    shim: {
	'underscore': {
	    exports: '_'
	},
	'backbone': {
	    deps: ['jquery', 'underscore'],
	    exports: 'Backbone'
	}
    },
    //useStrict: true,
    optimize: "uglify2",
    generateSourceMaps: true,
    preserveLicenseComments: false,
    name: "main",
    out: "main.min.js",
});

requirejs(['main']);

