'use strict';

define(['jquery', 'underscore', 'backbone', 'templates/ProductPreview'],
	function ($, _, backbone, ProductPreviewTemplate) {

	    var ProductPreview = Backbone.View.extend({
		tagName: 'li',
		className: 'ProductPreview',
		template: ProductPreviewTemplate,
		initialize: function () {
		    //console.log(this.model.aPopup.id);
		},
		render: function () {
		    this.$el.html(this.template(this.model.toJSON()));
		},
		events: {
		    'click': 'onClick'
		},
		onClick: function (event) {
		    //console.log(this.model.attributes.aPopup.id);
		    this.model.attributes.aPopup.show(400);
		    event.stopPropagation();
		}
	    });
	    return ProductPreview;
	});