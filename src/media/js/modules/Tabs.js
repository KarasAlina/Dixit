function Tabs() {
	this.rebuild();
}

Tabs.prototype = {
	rebuild() {
		let $tabs = $('[data-tabs]');
		let totalTabs = $tabs.length;
		for (let k = 0; k < totalTabs; k++) {
			this._initTabs($tabs.eq(k));
		}

		$tabs.removeAttr('data-tabs');
	},

	_initTabs($container) {
		let useSlideAnimation = typeof $container.attr('data-tabs-use-slideups') != 'undefined';
		$container.find('.tabs').append("<div class='tabs__sliding-block'></div>");
		let $openers = $container.find('[data-tab-opener]').removeClass('_active-tab');
		let $needOpeners = $('100-percent-no-element');

		let totalOpeners = $openers.length;
		for (let k = 0; k < totalOpeners; k++) {
			let $opener = $openers.eq(k);
			if (
				$opener
					.parents('[data-tabs]')
					.first()
					.is($container)
			) {
				$needOpeners = $needOpeners.add($opener);
			}
		}

		$openers = $needOpeners;

		let $tabs = $container.find('[data-tab]').removeClass('_active-tab');
		let $needTabs = $('100-percent-no-element');
		let totalTabs = $tabs.length;
		for (let k = 0; k < totalTabs; k++) {
			let $tab = $tabs.eq(k);
			if (
				$tab
					.parents('[data-tabs]')
					.first()
					.is($container)
			) {
				$needTabs = $needTabs.add($tab);
			}
		}

		$tabs = $needTabs;

		$openers.first().addClass('_active-tab');
		var leftPos, newWidth;
		var $background = $('.tabs__sliding-block');
		var widthopeners = $('._active-tab').width();
		console.log(widthopeners);
		// $background
		// 	.width($openers.first().width())
		// 	.css('left', $('._active-tab').position.left)
		// 	.data('origLeft', $background.position.left)
		// 	.data('origWidth', $background.width());

		let $firstTab = $tabs
			.first()
			.addClass('_active-tab')
			.show();
		$openers
			.filter('[data-tab-opener="' + $firstTab.attr('data-tab') + '"]')
			.addClass('_active-tab');

		$openers.click(function(e) {
			e.preventDefault();

			let $this = $(this);
			if ($this.hasClass('_active-tab')) {
				return;
			}

			$openers.removeClass('_active-tab');
			$tabs.removeClass('_active-tab');
			var x = $this.position();
			leftPos = x.left;
			newWidth = $this.width();
			$background.stop().animate({
				left: leftPos,
				width: newWidth,
			});
			if (useSlideAnimation) {
				$tabs.stop().slideUp();
			} else {
				$tabs.stop().hide();
			}

			$this.addClass('_active-tab');
			$openers
				.filter('[data-tab-opener="' + $this.attr('data-tab-opener') + '"]')
				.not($this)
				.addClass('_active-tab');

			let $tab = $tabs
				.filter('[data-tab="' + $this.attr('data-tab-opener') + '"]')
				.addClass('_active-tab');

			if (useSlideAnimation) {
				$tab.stop().slideDown();
			} else {
				$tab.stop().fadeIn();
			}
		});
	},
};

module.exports = new Tabs();
