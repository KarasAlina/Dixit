function Timer() {
	//declare start time
	var timer2 = $('[data-timer]').attr('data-timer');
	var buttonTimer = $('.button-timer');
	var indicator = $('[data-indicator]');
	//intercal for seconds
	var interval = setInterval(function() {
		//timer will be [hour, minute, second]
		if (timer2) {
			var timer = timer2.split(':');
			var minutes = parseInt(timer[0], 10);
			var seconds = parseInt(timer[1], 10);
			//reduce second by one
			--seconds;
			//calculate new minute and hours
			minutes = seconds < 0 ? --minutes : minutes;

			if (minutes < 0) {
				clearInterval(interval);
				return;
			}

			seconds = seconds < 0 ? 59 : seconds;
			seconds = seconds < 10 ? '0' + seconds : seconds;
			minutes = minutes < 0 ? 59 : minutes;
			minutes = minutes < 10 ? '0' + minutes : minutes;

			timer2 = minutes + ':' + seconds;
			indicator.html(timer2);
			if (timer2 == '00:00' && buttonTimer) {
				console.log('stop');
				var text = buttonTimer.attr('data-change-text');
				buttonTimer.html(text).removeAttr('disabled');
			}
		}
	}, 1000);
}
module.exports = new Timer();
