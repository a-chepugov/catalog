'use strict';

define(function () {

	function Template(Object) {
		var html = '';
		var Data = {
			name : ( (Object)&& Object.name && (Object.name instanceof Array) )?Object.name:[],
			price: ( (Object)&& Object.price && (Object.price instanceof Array) )?Object.price:[],
			image: ( (Object)&& Object.image && (Object.image instanceof Array) )?Object.image:[],
		};
		if (Data.image.length > 0)
			html += '<image src="' + Data.image[0] + '">';
		//for (var i in Data.name) {
		//	html += '<h3 class="name">' + Data.name[i] + '</h3>';
		//}
		//for (var i in Data.price) {
		//	html += '<p class="price">' + Data.price[i] + '</p>';
		//}
		return html;
	};

	return Template;
});