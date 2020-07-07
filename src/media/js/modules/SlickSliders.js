const dom = require('../utils/DOM');
const env = require('../utils/ENV');

const ACTIVE = '_active';

const OPTIONS_BY_TYPE = {
	main: {
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: false,
		draggable: false,
		fade: true,
		initialSlide: 0,
	},
	gallery: {
		slidesToShow: 3,
		centerMode: true,
		infinite: false,
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 560,
				settings: {
					slidesToShow: 1,
				},
			},
		],
	},
	backgrounds: {
		slidesToShow: 3,
		infinite: false,
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 560,
				settings: {
					slidesToShow: 2,
				},
			},
		],
	},
};

const CUSTOM_SETTINGS_BY_TYPE = {
	/*galleryMain: {
		skipUpdate: true,
	},*/
};

function SlickSliders() {
	const $sliders = $('[data-slider]');
	const totalSliders = $sliders.length;
	for (let k = 0; k < totalSliders; k++) {
		this._initSlider($sliders.eq(k));
	}
	/*dom.$window.on('resize orientationchange', () => {
		setTimeout(() => {
		this.update();
		}, 300);
	});*/
}

SlickSliders.prototype = {
	_initSlider($container) {
		let type = $container.attr('data-slider');
		let $slides = $container.find('[data-slider-slides]');

		let totalSlides = $slides.children().length;
		let $total = $container.find('[data-slider-total]');
		let $prev = $container.find('[data-slider-prev]');
		let $next = $container.find('[data-slider-next]');
		let $whenActives = $container.find('[data-slider-when-active]');
		let $dotsContainer = $container.find('[data-slider-dots]');
		let currentSlideId = 0;

		let $subSlides = $container.find('[data-slider-sub-slides]').children();
		let $previews = $container.find('[data-slider-previews]').children();

		if ($total) {
			$total.text(totalSlides + 1);
		}

		if (totalSlides > 0) {
			$container.find('[data-slider-total]').text(totalSlides);

			let options = {
				nextArrow: $next,
				prevArrow: $prev,
			};
			let typeOptions = OPTIONS_BY_TYPE[type];
			if (typeof typeOptions != 'undefined') {
				let nav;
				for (let i in typeOptions) {
					options[i] = typeOptions[i];

					if (i == 'asNavFor') {
						const $navTarget = $container
							.parent()
							.parent()
							.find('[data-slider="' + typeOptions[i] + '"]')
							.first();

						if ($navTarget.length) {
							options[i] = $navTarget.find('[data-slider-slides]');
						} else {
							options[i] = null;
						}
						// $container.attr('data-slider-nav', '')
						// console.log($container.parents('[data-project]').attr('data-project'),  $container[0], $navTarget[0])
					}
				}
			}

			let customSettings = CUSTOM_SETTINGS_BY_TYPE[type] || {};

			if (customSettings.skipUpdate) {
				$slides.attr('data-skip-update', '');
			}

			$slides.slick(options);
			$('.header-results__button').on('click', function() {
				$slides.slick('slickGoTo', 5);
			});
			if ($dotsContainer.length) {
				let $dotModel = $dotsContainer
					.children()
					.first()
					.removeClass(ACTIVE);
				$dotsContainer.empty();

				for (let k = 0; k < totalSlides; k++) {
					if (k < 9) {
						$dotsContainer.append($dotModel.clone());
					} else {
						$dotsContainer.append($dotModel.clone());
					}
				}

				let $dots = $dotsContainer.children();
				$dots.click(e => {
					e.preventDefault();
					$slides.slick('slickGoTo', $(e.currentTarget).index());
				});

				dom.$document.keydown(e => {
					const code = e.keyCode;
					if (code === 39) {
						$slides.slick('slickGoTo', currentSlideId + 1);
					} else if (code === 37) {
						$slides.slick('slickGoTo', currentSlideId - 1);
					}
				});

				$slides.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
					currentSlideId = nextSlide;
					$dots.removeClass('_active');
					for (let k = 0; k < $dotsContainer.length; k++) {
						let $currentDotsContainer = $dotsContainer.eq(k);
						let $currentDot = $currentDotsContainer
							.children()
							.eq(nextSlide)
							.addClass(ACTIVE);
					}
				});

				for (let k = 0; $dotsContainer.length > k; k++) {
					$dotsContainer
						.eq(k)
						.children()
						.first()
						.addClass(ACTIVE);
				}
			}

			let $current = $container.find('[data-slider-current]');
			if ($current.length) {
				$slides.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
					$current.text(nextSlide + 1);
					TweenMax.fromTo($current, 0.35, { alpha: 0 }, { alpha: 1 });
				});
				$current.text(1);
			}

			if ($subSlides.length) {
				let index = 0;
				$slides.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
					if (index != nextSlide) {
						index = nextSlide;
						$subSlides
							.stop()
							.hide()
							.eq(nextSlide)
							.fadeIn();
					}
				});

				$subSlides
					.hide()
					.first()
					.show();
			}

			if ($previews.length) {
				$previews.click(e => {
					e.preventDefault();
					$slides.slick('slickGoTo', $(e.currentTarget).index());
				});

				$slides.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
					$previews
						.removeClass(ACTIVE)
						.eq(nextSlide)
						.addClass(ACTIVE);
				});
			}
			$slides.on('beforeChange', function(e, slick, currentSlide) {
				if (currentSlide == 1) {
					$('body').addClass('_authorized');
					console.log(currentSlide);
				}
			});
			$slides.on('afterChange', function(e, slick, currentSlide) {
				$('._animated').addClass('_visible');
			});
			TweenMax.to($whenActives, 0.35, { alpha: 1 });
		} else {
			$whenActives.remove();
		}
	},
	update(forced) {
		let $sliders;
		if (forced) {
			$sliders = $('[data-slider-slides]');
			$sliders.slick && $sliders.slick('refresh');
		} else {
			$sliders = $('[data-slider-slides]').not('[data-skip-update]');
			$sliders.slick && $sliders.slick('refresh');
		}

		// console.log($sliders.is(':visible'))
		// setTimeout(this.update, 100)
	},
	scrollTo(slider, position, immediate) {
		let $slider = $(slider);
		$slider.slick('setPosition');
		$slider.slick('slickGoTo', parseInt(position), immediate);
	},
	add(slider, template) {
		$(slider).slick('slickAdd', template);
	},
	remove(slider) {
		let length = slider.find('.slick-slide').length + 3;
		for (let k = 0; k < length; k++) {
			let i = slider.find('.slick-slide').attr('data-slick-index');
			slider.slick('slickRemove', i);
			let j = 0;
			slider.find('.slick-slide').each(function() {
				$(this).attr('data-slick-index', j);
				j++;
			});
		}
	},
};

module.exports = new SlickSliders();
