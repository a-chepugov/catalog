'use strict';

define(['jquery', 'underscore', 'backbone', 'Views/ProductPreview', 'Models/Product'],
	function ($, _, backbone, ProductPreviews, ProductModel) {

	    var CatalogPreview = Backbone.View.extend({
		tagName: 'ul',
		className: 'ProductPreviewCatalog',
		initialize: function () {
		},
		render: function () {
		    this.collection.each(function (anItem) {
			var anItemView = new ProductPreviews({model: anItem});
			anItemView.render();
			this.$el.append(anItemView.el);
		    }, this);

		    return this;
		}
	    });
	    return CatalogPreview
	});