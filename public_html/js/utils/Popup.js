'use strict';
define(['jquery'], function () {

	function Popup(aHTMLElement, parameters) {
		try {
			if (!(aHTMLElement instanceof HTMLElement)) throw TypeError('Element is not valid HTMLElement');

			this.id = aHTMLElement.getAttribute('id');

			var Data = {
				delay: ( parameters && parameters.delay && !isNaN(parameters.delay) ) ? parameters.delay : 0
			};

			this.show = function (delay) {
				if (!isNaN(delay)) {
					delay = Data.delay;
				}
				ThisjQElement.show(delay); // Показать окно
				$('#blackout').show(delay); // Затемнить фон
			};

			this.hide = function (delay) {
				if (isNaN(delay)) {
					delay = Data.delay;
				}
				ThisjQElement.hide(delay); // Показать окно
				$('#blackout').hide(delay); // Затемнить фон
			};

			var SelfLink = this;
			var ThisjQElement = $(aHTMLElement);

			if (!$('body').is('#blackout')) {
				$('body').append('<div id="blackout"></div>');
			}


			// Получение геометрии объекта содержащего Х
			this.getProperty = (function (aHTMLElement) {
				return function (propertry) {
					return getComputedStyle(aHTMLElement, ':after').getPropertyValue(propertry)
				};
			})(aHTMLElement);

			//q(this.getProperty('width'));

			this.CloseButton = {
				width: this.getProperty('width') ? parseInt(this.getProperty('width')) : 20,
				height: this.getProperty('height') ? parseInt(this.getProperty('height')) : 20,
				right: this.getProperty('right') ? parseInt(this.getProperty('right')) : 0,
				top: this.getProperty('top') ? parseInt(this.getProperty('top')) : 0
			};

			// Добавление реакции на щелчек по Х
			(function (context) {
				// Добавление реакции на щелчек по Х
				ThisjQElement.click(function (event) { // Выполнить закрытие при щелчке в нужных координатах
					//q(event.offsetX , event.offsetY )
					if (
						( event.offsetX < ThisjQElement.width() - context.CloseButton.right ) &&
						( event.offsetX > ThisjQElement.width() - (context.CloseButton.right + context.CloseButton.width ) ) &&
						( event.offsetY > context.CloseButton.top ) &&
						( event.offsetY < (context.CloseButton.top + context.CloseButton.height ) )
					) {
						SelfLink.hide();
						//q('закрыл');
					}
					event.stopPropagation();
				});
			})(this);

			// Реакция на нажатие за границей окна
			(function () {
				$('html').click(function () {
					SelfLink.hide();
				});
			})();

			// Реакция на нажатие Esc
			(function () {
				$('html').keydown(function (event) {
					event.stopPropagation();
					if (event.keyCode === 27) {

						SelfLink.hide();
					}
				});
			})();
		}
		catch (error) {
			console.log(error)
		}

	};
	return Popup;
});