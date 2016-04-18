'use strict';

define(function () {

	function Template(Object) {
		var html = '';
		var Data = {
			name : ( (Object)&& Object.name && (Object.name instanceof Array) )?Object.name:[],
			description: ( (Object)&& Object.description && (Object.description instanceof Array) )?Object.description:[],
			price: ( (Object)&& Object.price && (Object.price instanceof Array) )?Object.price:[],
			image: ( (Object)&& Object.image && (Object.image instanceof Array) )?Object.image:[],
		};
		for (var i in Data.name) {
			html += '<h3>' + Data.name[i] + '</h3>';
		}
		for (var i in Data.image) {
			html += '<image class="ProductImage" src="' + Data.image[i] + '">';
		}
		for (var i in Data.description) {
			html += '<p class="description">' + Data.description[i] + '</p>';
		}
		for (var i in Data.price) {
			html += '<p class="price">Цена: ' + Data.price[i] + '</p>';
		}


		//'<div class="name[0]"><%= name[0] %></div> ( <%= price[0] %> ) - <%= description[0] %><br/>' ),

		//q(html);
		return html;
	};

	return Template;
});