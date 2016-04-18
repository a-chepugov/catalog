'use strict';

define(['jquery', 'underscore', 'backbone', 'Views/Product', 'Models/Product'],
	function ($, _, backbone, ProductViews, ProductModel) {

	var CatalogView= Backbone.View.extend({
		tagName: 'div',
		className: 'ProductCatalog',

		initialize: function(){
		},
		render: function() {
			this.collection.each(function(anItem) {
				var anItemView = new ProductViews({model: anItem});
				anItemView.render();
				this.$el.append(anItemView.el);
			}, this);

			return this;
		}
	});
	return CatalogView;
});