'use strict';

//Генерирует случайный идентификатор
define(function () {

	function UniqueId(Obj) {

		var Config = {
			prefix:( Obj && Obj.prefix )? Obj.prefix:'',
			postfix:( Obj && Obj.postfix )? Obj.postfix:'',
			length:( Obj && Obj.length && (!isNaN(Obj.length) ))? +(Obj.length).toFixed(0):10,
			radix:( Obj && Obj.radix && (!isNaN(Obj.radix) ) )? +(Obj.radix).toFixed(0):30
		};

		var Data = new Array(Config.length);

		this.generate = function () {
			for (var i = 0; i < Data.length; i++) {
				Data[i] = Math.floor(Math.random() * Config.radix);
			}
		};

		this.isSameId = function () {
			if (document.getElementById(this.toString())) return true;
			else return false;
		};

		this.makeUnique = function () {
			while (this.isSameId()) {
				this.generate();
			}
		};

		this.toString = function () {
			var toStringEntity = '';
			toStringEntity += Config.prefix;

			for (var i = Data.length - 1; i >= 0; i--) {
				toStringEntity += Data[i].toString(Config.radix);
			}
			;

			toStringEntity += Config.postfix;
			return toStringEntity;
		};

		this.valueOf = function () {
			var valueOfEntity = 0;
			for (var i = 0; i < Data.length; i++) {
				valueOfEntity += Data[i] * Math.pow(10, i);
			}
			;

			return valueOfEntity;
		}

		this.generate();
		this.makeUnique();


		function randomInteger(min, max) {
			var random = min + Math.random() * (max + 1 - min);
			random = Math.floor(random);
			return random;
		}
	}
	return UniqueId;
});
