requirejs.config({
    //By default load any module IDs from scripts
    baseUrl: '',
    i18n:{
    	locale:'zh-cn'
    },
    paths: {
        'jquery': 'scripts/jquery-3.2.0',
        'bootstrap':'bootstrap-3.3.7/js/bootstrap',
        'jquery.validate': 'scripts/jquery.validate.min',
        'handlebars':"scripts/handlebars-v4.0.5",

        'my_cruise':'src/my_cruise'
    },
    'shim': {
    	'bootstrap': {
    		deps:['jquery']
    	},
        'jquery.validate': {
            deps: ['jquery']
        }
    }
});

// Start the main app logic.
requirejs(['jquery','bootstrap','my_cruise']);