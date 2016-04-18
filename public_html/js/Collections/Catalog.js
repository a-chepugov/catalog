'use strict';

define(['Models/Product', 'utils/loadData', 'backbone'],
	function (ProductModel, loadData, backbone) {

	    var Catalog = Backbone.Collection.extend({
		model: ProductModel,
		initialize: function () {
		    this.fetchData(this, '1.csv');
//		    console.log(this.fetchData.toString());
		},
		fetchData: loadData,
		SyncData: 0
	});
	return Catalog;
});