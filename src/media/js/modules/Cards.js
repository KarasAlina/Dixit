const dom = require('../utils/DOM');

function Cards() {
	var card = $('[data-card-zooming]');
	var cardParent = card.parent();
	var zoom = $('.card__increase');
	var gallery = $('.choose-card-gallery-wrapper');
	var gallerySlide = $('.choose-card-gallery-wrapper .card');
	var closer = $('.choose-card-gallery__closer');
	var button = $('.choose-card__button');

	cardParent.on('click', function() {
		let $this = $(this).find(card);
		if ($this.is(':not(._focus)') && $this.is(':not(._active)')) {
			$this.addClass('_focus').removeClass('_disabled');
			button.removeAttr('disabled');
			$(this)
				.siblings()
				.find(card)
				.removeClass('_focus')
				.addClass('_disabled');
		} else if ($this.parents().is('.choose-card')) {
			var slideIndex = $(this).index();
			setTimeout(function() {
				$('[data-slider-slides]').slick('slickGoTo', parseInt(slideIndex));
			}, 300);

			gallery.addClass('_show');
		} else {
			card.removeClass('_focus').removeClass('_disabled');
			button.attr('disabled', 'disabled');
		}
	});
	$('.selected-associations__small-cards').on('click', function() {
		var slideIndex1 = $(this).index();
		setTimeout(function() {
			$('.choose-card-gallery').slick('slickGoTo', parseInt(slideIndex1 - 1));
		}, 300);
		console.log(slideIndex1);
		gallery.addClass('_show');
	});
	closer.on('click', function() {
		gallery.removeClass('_show');
	});
	dom.$document.mouseup(function(e) {
		if (!card.is(e.target) && card.has(e.target).length === 0) {
			card.removeClass('_focus').removeClass('_disabled');
			button.attr('disabled', 'disabled');
		}
		if (!gallerySlide.is(e.target) && gallerySlide.has(e.target).length === 0) {
			gallery.removeClass('_show');
		}
	});
	// $('.card').on('click', function() {
	// 	$(this).toggleClass('_active');
	// });
}
module.exports = new Cards();
