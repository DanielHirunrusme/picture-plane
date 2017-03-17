/**
 * Global settings shared by all modules
 * @type {Object}
 */

var settings = module.exports = {
	page: $('.main').data('page'),
	prevPage: '',
	currentProject: 0,
	animating:false,
	init: true,
	currImage: 0,
	totalImages: 0,
	isMobile: false,
	url: $('body').data('url')
};

settings.page = settings.page;
settings.currentProject = settings.currentProject;
settings.animating = settings.animating;
settings.init = settings.init;
settings.currImage = settings.currImage;
settings.url = settings.url;
