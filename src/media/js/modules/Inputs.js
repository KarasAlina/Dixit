function Inputs() {
	var show = $('.input-visibility');
	show.click(function() {
		$(this).toggleClass('_not-show');
		var input = $(this).prev('.input');
		if (input.attr('type') == 'password') {
			input.attr('type', 'text');
		} else {
			input.attr('type', 'password');
		}
	});
	var bigStep = 100;

	$('[data-add]').click(function() {
		var inputNumber = $(this).siblings('.input');
		var max = inputNumber.attr('max');
		let step = inputNumber.attr('step');
		max -= step;
		var currentVal = parseInt(inputNumber.val());
		if (!isNaN(currentVal) && currentVal <= max) {
			inputNumber.val(currentVal + Number(step));
		} else {
			inputNumber.val();
		}
	});
	$('[data-sub]').click(function() {
		var inputNumber2 = $(this).siblings('.input');
		var step2 = inputNumber2.attr('step');
		var currentVal = parseInt(inputNumber2.val());
		if (!isNaN(currentVal) && currentVal > 0) {
			inputNumber2.val(currentVal - Number(step2));
		} else {
			inputNumber2.val(0);
		}
	});
	$('[data-check-pin]').change(function() {
		var inputPin = $()('.input-check-pin');
		inputPin.attr('disabled', !inputPin.attr('disabled'));
	});
}
module.exports = new Inputs();
