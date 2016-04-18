'use strict';

define(['backbone'],
	function (backbone) {
	    
	    var Product = Backbone.Model.extend({
		defaults: {
		    name: ['Название цветка'],
		    description: ["Описание цветка"],
		    price: ['дог.'],
		    image: ['images/defaultflower.png']
		}
	    });
	    
	    return Product;
	});