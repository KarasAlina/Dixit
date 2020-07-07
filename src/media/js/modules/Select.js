const dom = require('../utils/DOM');

var container = $('.select');
var init = $('.select__init');
var wrapper = $('.select-options');
var option = $('.select-options__item').not('.select-languages-header-options__item');
var optionHeader = $('.select-languages-header-options__item');
var dropdown = $('.dropdown');
var trigger = dropdown.find('.dropdown__init');

init.on('click', function() {
	$(this)
		.parent(container)
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
trigger.on('click', function() {
	$(this)
		.parent(dropdown)
		.toggleClass('_opened');
});

dom.$document.mouseup(function(e) {
	if (!container.is(e.target) && container.has(e.target).length === 0) {
		container.removeClass('_opened');
	}
	if (!dropdown.is(e.target) && dropdown.has(e.target).length === 0) {
		dropdown.removeClass('_opened');
	}
});
