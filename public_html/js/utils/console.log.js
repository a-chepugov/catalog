'use strict';
// Функция для вывода в консоль
// Почередно выводит в консоль свои аргументы
define(function () {
	return function q() {
		[].forEach.call(arguments, function (item) {
			console.log(item);
		})
	};
});