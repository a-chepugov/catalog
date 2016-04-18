// Добавить предпросмотр к данным
define(['jquery', 'utils/Popup'],
	function ($, Popup) {

		function Gallery(Config) {
			this.config = {
				Parent : (Config && Config.Parent && (Config.Parent instanceof HTMLElement) ) ? Config.Parent : document.body,
				ItemClass : (Config && Config.ItemClass && ( (typeof Config.ItemClass) === 'string' ) ) ? Config.ItemClass : ''
			}
			//q(Config); q(this.config);

			this.id = this.config.Parent.getAttribute('id');
			var Parent$El = $(this.config.Parent);

			var Items = Parent$El.find('.' + this.config.ItemClass);
			Items.wrapAll('<div class="GalleryViewport">');

			var aBigImageEl = document.createElement('div');
			var aBigimage$El = $(aBigImageEl);
			aBigimage$El.addClass('ViewedImg');
			Parent$El.append(aBigImageEl);
			Parent$El.find('.GalleryViewport').prepend(aBigImageEl);

			Items.on('click', function() {
				aBigimage$El.empty();
				var anItemViewPort = $(this).clone();
				aBigimage$El.append( anItemViewPort);
			});
			Items.trigger('click');
		}
		return Gallery;
	} );

function lockContext (funct, context) {
	return funct.bind(context)
}

