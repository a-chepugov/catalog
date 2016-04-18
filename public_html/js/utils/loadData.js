'use strict';

// Получить данные из файла и создать элементы с данными и необходимыми классами
define(['jquery', 'utils/CSVToJSON', 'backbone', 'utils/console.log'],
	function ($, parseCSVToJSON) {

	    function loadDataTo(BackboneCollection, SourceURL) {
		$.ajax({url: SourceURL}).success(function (data) {
		    var ObjectData = JSON.parse(parseCSVToJSON(data)); // Получаем данные из файла и делай из них объект

		    for (var item in ObjectData) {
//			q(ObjectData[item]);
			BackboneCollection.add(ObjectData[item]);
//			q(BackboneCollection.get(item) );
		    }

		    q(BackboneCollection.toJSON());
		    BackboneCollection.trigger('loaded');
		});
	    }
	    ;

	    return loadDataTo;
	});