const Callback = require('../classes/Callback');
const dom = require('../utils/DOM');
// const BodyLocker = require('../helpers/BodyLocker');
// const SlickSliders = require('./SlickSliders');

function Popups() {
	this.onOpen = new Callback();
	this.onClose = new Callback();
	this.onCloseStart = new Callback();

	this.opened = false;
	this.openedClass = '';

	this.$openers = $('[data-popup-opener]').removeClass('_active');
	this.$wrapper = $('.popups-wrapper')
		.addClass('no-pe')
		.hide();

	this.$popups = $('[data-popup]').hide();

	this.$activePopup = null;
	this.activePopupName = '';

	let self = this;
	// self.open('round-finished');
	dom.$body.on('click', '[data-popup-opener]', function(e) {
		e.preventDefault();

		let $this = $(this);

		self.open($this.attr('data-popup-opener'));
		$this.addClass('_active');
		var $background = $('.tabs__sliding-block');
		var widthopeners = $('._active-tab').width();
		console.log(widthopeners);
		$background
			.width($('._active-tab').width())
			.css('left', $('._active-tab').position.left)
			.data('origLeft', $background.position.left)
			.data('origWidth', $background.width());
		$('.backgrounds-slider').slick('refresh');
	});

	this.$ytPopup = this.$popups.filter('[data-popup="yt-video"]');
	dom.$body.on('click', '[data-yt-video-popup]', function(e) {
		e.preventDefault();

		let $this = $(this);

		self.open('yt-video');
		//$this.addClass('_active');
		self.$ytPopup.find('.video').html(`
		<iframe
			id="player"
			type="text/html"
			width="100%"
			height="100%"
			src="http://www.youtube.com/embed/${$this.attr('data-yt-video-popup')}"
			frameborder="0"
			allowfullscreen>
		</iframe>`);
	});

	dom.$body.on('click', '[data-popup-toggler]', function(e) {
		e.preventDefault();

		let $this = $(this);

		if (self.opened) {
			self.close();
		} else {
			self.open($this.attr('data-popup-toggler'));
			$this.addClass('_active');
		}
	});

	$('[data-popup-closer]').click(function(e) {
		e.preventDefault();
		self.close();
	});

	this.$wrapper.click(function(e) {
		if (self.opened) {
			let $target = $(e.target);
			if (!(self.$activePopup.has($target).length || self.$activePopup.is($target))) {
				self.close();
			}
		}
	});

	dom.$window.on('keydown', function(e) {
		if (self.opened && e.keyCode == 27) {
			self.close();
		}
	});
}

Popups.prototype = {
	getOpenedPopup: function() {
		if (this.opened) {
			return this.$activePopup;
		} else {
			return null;
		}
	},

	isOpened: function() {
		return this.opened;
	},

	open: function(name) {
		if (this.activePopupName == name) {
			return;
		}

		if (this.opened) {
			this.close(true);
		}

		let $popup = $('[data-popup="' + name + '"]');
		if (!$popup.length) {
			return;
		}

		this.opened = true;
		this.$activePopup = $popup.show();
		this.activePopupName = name;
		this.$openers.removeClass('_active');

		this.$wrapper.addClass('_' + name);

		TweenMax.to(this.$wrapper.show().removeClass('no-pe'), 0.35, { autoAlpha: 1, overwrite: true });
		TweenMax.fromTo(
			this.$activePopup,
			0.35,
			{ autoAlpha: 0, scale: 0.98 },
			{ autoAlpha: 1, scale: 1 }
		);

		dom.$html.addClass('_popup-opened');

		this.openedClass = '_popup-opened-' + name;
		dom.$html.addClass(this.openedClass);

		// BodyLocker.lock();

		// SlickSliders.update();

		this.onOpen.call();
	},

	close: function(immediate) {
		if (this.opened) {
			this.opened = false;

			this.$wrapper.removeClass('_' + this.activePopupName);

			this.onCloseStart.call(this.activePopupName);

			this.activePopupName = '';

			let self = this;

			TweenMax.to(this.$wrapper.addClass('no-pe'), 0.35, { autoAlpha: 0, display: 'none' });
			TweenMax.to(this.$activePopup, immediate ? 0 : 0.35, {
				autoAlpha: 0,
				scale: 0.98,
				display: 'none',
				onComplete: function() {
					self.onClose.call();
				},
			});

			this.$activePopup.find('[data-popup-target-frame]').attr('src', '');

			dom.$html.removeClass('_popup-opened');
			this.$openers.removeClass('_active');

			if (this.openedClass != '') {
				dom.$html.removeClass(this.openedClass);
				this.openedClass = '';
			}

			this.$ytPopup.html('');
			// BodyLocker.unlock();
		}
	},
};

module.exports = new Popups();
