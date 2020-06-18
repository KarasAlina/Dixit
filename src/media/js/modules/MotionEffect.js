var timeout;
const $section = $('.section__wrapper');

$section.mousemove(function(e) {
	if (timeout) clearTimeout(timeout);
	setTimeout(callParallax.bind(null, e), 300);
});

function callParallax(e) {
	parallaxIt(e, '.level-1', -10);
	parallaxIt(e, '.level-2', -15);
	parallaxIt(e, '.level-3', -20);
	parallaxIt(e, '.level-4', -25);
	parallaxIt(e, '.level-5', -30);
	parallaxIt(e, '.level-6', -35);
	parallaxIt(e, '.level-1-reverse', 10);
	parallaxIt(e, '.level-2-reverse', 15);
	parallaxIt(e, '.level-3-reverse', 20);
	parallaxIt(e, '.level-4-reverse', 25);
	parallaxIt(e, '.level-5-reverse', 30);
	parallaxIt(e, '.level-6-reverse', 35);
	parallaxItHorizontal(e, '.level-1-horizontal', -10);
	parallaxItHorizontal(e, '.level-1-horizontal-reverse', 10);
}
function parallaxIt(e, target, movement) {
	var $this = $section;
	var relX = e.pageX - $this.offset().left;
	var relY = e.pageY - $this.offset().top;

	TweenMax.to(target, 1, {
		x: ((relX - $this.width() / 2) / $this.width()) * movement,
		y: ((relY - $this.height() / 2) / $this.height()) * movement,
		ease: Power3.easeOut,
	});
}
function parallaxItHorizontal(e, target, movement) {
	var $this = $section;
	var relX = e.pageX - $this.offset().left;

	TweenMax.to(target, 1, {
		x: ((relX - $this.width() / 2) / $this.width()) * movement,
		ease: Power3.easeOut,
	});
}
