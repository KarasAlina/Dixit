function Progressbar() {
	var progressBarOptions = {
		startAngle: -1.55,
		fill: {
			color: '#FFCD45',
		},
	};
	$('[data-player-loading]')
		.circleProgress(progressBarOptions)
		.on('circle-animation-progress', function(event, progress, stepValue) {
			$(this)
				.parents('.player')
				.find('.player__percents')
				.text(String(stepValue.toFixed(2)).substr(2) + '%');
		});

	var container, reputation, progress, i, text;
	container = $('.progress');
	reputation = container.find('.progress__bar');
	text = container.find('.progress__text');
	for (i = 0; i < reputation.length; i++) {
		console.log(i);
		progress = $(reputation[i]).attr('aria-valuenow');
		$(reputation[i]).width(progress + '%');
		if (progress >= '90') {
			$(reputation[i]).addClass('bar-perfect');
			text.text(progress + '% perfect');
		} else if (progress >= '75' && progress < '90') {
			$(reputation[i]).addClass('bar-good');
			text.text(progress + '% good');
		} else if (progress >= '50' && progress < '75') {
			$(reputation[i]).addClass('bar-middle');
			text.text(progress + '% middle');
		} else {
			$(reputation[i]).addClass('bar-bed');
			text.text(progress + '% bed');
		}
	}
}

module.exports = new Progressbar();
