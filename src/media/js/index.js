import { TweenMax } from 'gsap';
import { Draggable } from 'gsap/Draggable';
global.TweenMax = TweenMax;
global.$ = global.jQuery = require('jquery');
global.Draggable = Draggable;
require('./utils/jqExtensions');
require('slick-carousel');

// prettier-ignore
global.ProjectName = new function ProjectName() { // eslint-disable-line
	this.env = require('./utils/ENV');
	this.dom = require('./utils/DOM');
	this.utils = require('./utils/Utils');

	this.classes = {
		Callback: require('./classes/Callback')
	};

	this.helpers = {};
	this.modules = {
		SlickSliders: require('./modules/SlickSliders'),
		MotionEffect: require('./modules/MotionEffect'),
		Select: require('./modules/Select'),
		Popups: require('./modules/Popups'),
		Inputs: require('./modules/Inputs'),
	};

	// Startup
	$(() => {
		// Remove _loading modificator
		this.dom.$html.removeClass('_loading');
		
	});
}();

if (module.hot) {
	module.hot.accept();
}
