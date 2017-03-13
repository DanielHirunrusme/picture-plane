/**
 * Global settings shared by all modules
 * @type {Object}
 */

var settings = module.exports = {
	page: $('body').data('page').split('page-').join(),
	prevPage: '',
	currentProject: 0,
	animating:false,
	init: true,
	currImage: Number($('.curr-num').text() - 1),
	totalImages: 0,
	isMobile: false
};

settings.page = settings.page;
settings.currentProject = settings.currentProject;
settings.animating = settings.animating;
settings.init = settings.init;
settings.currImage = settings.currImage;
