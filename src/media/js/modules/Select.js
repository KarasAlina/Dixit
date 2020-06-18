var container = $('.select');
var init = $('.select__init');
var wrapper = $('.select-options');
var option = $('.select-options__item').not('.select-languages-header-options__item');
var optionHeader = $('.select-languages-header-options__item');

init.on('click', function() {
	$(this)
		.parent('.select')
		.toggleClass('_opened');
});
optionHeader.on('click', function() {
	var svg = $(this)
		.find('svg')
		.clone();
	var textHeader = $(this).data('title');
	$(this)
		.parents()
		.removeClass('_opened')
		.children('.select__init')
		.html(svg)
		.append('<span>' + textHeader + '</span>');
	$(this)
		.addClass('_selected')
		.siblings()
		.removeClass('_selected');
});
option.on('click', function() {
	var text = $(this).html();
	$(this)
		.parents()
		.removeClass('_opened')
		.children('.select__init')
		.html('<span>' + text + '</span>');
	$(this)
		.addClass('_selected')
		.siblings()
		.removeClass('_selected');
});

$('.card').on('click', function() {
	$(this).toggleClass('_active');
});
