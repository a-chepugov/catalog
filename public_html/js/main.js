'use strict';

require([
    'utils/console.log',
    'Collections/Catalog',
    'Views/Catalog',
    'Views/CatalogPreview'
],
	function (q, CatalogCollection, CatalogView, CatalogPreview) {
		window.q = q;

		window.App = {
			Models: {},
			Views: {},
			Collections: {}
		};

		App.Collections.Catalog = CatalogCollection;
		App.Views.Catalog = CatalogView;
		App.Views.CatalogPreview = CatalogPreview;

		// ------------------------------------

		var aCatalog = new App.Collections.Catalog();
		var aCatalogView = new App.Views.Catalog({collection: aCatalog});
		var aCatalogPreview = new App.Views.CatalogPreview({collection: aCatalog});

		aCatalog.on('loaded', function() {
			aCatalog.add({});
//			q(aCatalog);
			$(document.body).append(aCatalogView.render().el);
			$(document.body).append(aCatalogPreview.render().el);
		});
});