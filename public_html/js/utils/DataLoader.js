// Получить данные из файла и создать элементы с данными и необходимыми классами
define(['jquery', 'CSV', 'ObjectToXML', 'DivToImg', 'popup', 'lib/console.log.js', 'Gallery'], function () {
	q = require ('./lib/console.log.js');
	var Preview = require('./../utils/Gallery');

	return function DataLoader() {

		var wrapper = document.createElement('div');

		$(document).ready(function () {
			var q = require('./lib/console.log.js');
			var parseCSVToJSON = require('./CSV');
			var parseObjectToXMLElement = require('./ObjectToXML');
			var convertDivToImg = require('./DivToImg');

			$.ajax({url: "1.csv"}).success(function (data) {
				var ObjectData = JSON.parse(parseCSVToJSON(data)); // Получаем данные из файла и делай из них объект

				$('body').append(wrapper);

				$(wrapper).addClass('PreviewParent');

				for (var item in ObjectData) {
					var HTMLElement = parseObjectToXMLElement(ObjectData[item]); // Делаем каждый элемент объекта HTML элементом
					convertDivToImg(HTMLElement); // Превращаем слои изображений в рисунки
					var $this = $(HTMLElement);
					{ // !!!!!!!!!!!!! Добавляем небходимые классы элементу и его детям для их правильной верстки (нужно только для магазина)
						$this.addClass('product popup PreviewSource'); //
						$this.find('img').eq(0).addClass('PreviewItem'); // Помеаем первый элемент для предпросмотра
					}
					$(wrapper).append($this); // Вводим элемент в документ
				}

				$('main').append('<div class="PreviewPlace">');
				new Preview( {PreviewPlace: $('.PreviewPlace').get(0), ParentHTMLElement: $('.PreviewSource').get(0) });
			});

		});
	};

});