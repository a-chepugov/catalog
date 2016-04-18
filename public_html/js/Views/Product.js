'use strict';

define(['jquery', 'underscore', 'backbone', 'templates/Product', 'utils/Popup', 'utils/UniqueId', 'utils/Gallery'],
	function ($, _, backbone, ProductTemplate, Popup, UniqueId, Gallery) {
		//var UniqueId = Unique();

		var ProductView = Backbone.View.extend({
			tagName: 'div',
			className: 'Product popup',
			id: (function () { return (new UniqueId()).toString() }),
			template: ProductTemplate,

			initialize: function(){
				var aPopup = new Popup(this.el, {delay:400});
				this.model.set('aPopup', aPopup);
			},

			render: function() {
				this.$el.html( this.template( this.model.toJSON() ) );
				var aGallery = new Gallery({Parent: this.el, ItemClass: 'ProductImage'});
			}
		});
		return ProductView;
	});