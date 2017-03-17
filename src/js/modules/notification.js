var settings = require( "modules/settings" ),
	mousewheel = require( "jquery-mousewheel" )($);


var notification = module.exports = {
		
		init: function(){
			if(settings.page == 'default'){
				notification.remove();
				return false;
			}
			var $el = $('#notification');
			$el.find('a').on('vclick', notification.linkClick)
			//$el.slideDown();
			$el.on('vclick', notification.notificationClick);
			$('#projects-container').on('scroll', notification.notificationScroll);
		},
		
		notificationClick: function(){
			var $el = $('#notification');
			$el.slideUp(200);
		},
		
		linkClick: function(){
			var $el = $('#notification');
			$el.hide();
		},
		
		notificationScroll: function(){
			var $el = $('#notification');
			$el.slideUp(200);
			$('#projects-container').off('scroll', notification.notificationScroll);
		},
		
		remove: function(){
			var $el = $('#notification');
			$el.remove();
		}
		
		
		
};
  