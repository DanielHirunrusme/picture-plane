var settings = require( "modules/settings" ),
barba = require("barba.js");



function initializeBarbaModules() {
  var modules = $('.barba-container').find( "[data-module-init]" );

  for ( var i = 0; i < modules.length; i++ ) {
    var el = modules[ i ];
    var names = el.getAttribute( "data-module-init" ).split( " " );
    var Module;
	var removeTransition;
	
    for ( var j = 0; j < names.length; j++ ) {
	 
      try {
		  
        Module = require( "modules/" + names[ j ] );
		
      } catch ( e ) {
        Module = false;
        console.log( names[ j ] + " module does not exist." );
      }
	  

      // Initialize the module with the calling element
      if ( Module ) {
        new Module( el );
      }
    }
  }

}


module.exports = function( el ) {
		var $el = $( el ),
		$window = $( window ),
		$cursor = $('.cursor');
		var removeTransition;
		
		init();
		winResize();
		
		function init(){
			if($('body').data('device')=='mobile') settings.isMobile = true;
			if(!settings.isMobile) initBarba();
			initIndex();
			$window.on('resize', winResize);
			
			if(!$('body').hasClass('page-project')){
				setTimeout(function(){
					settings.init = false;
				}, 200);
			}
			
		}
		
		function initIndex(){
			index.init();
		}
		
		function initBarba(){
			Barba.Pjax.start();
			
			Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
				$('body').removeClass().addClass($(container).find('main').data('page'));
				
				settings.prevPage = settings.page;
				var page = $(container).find('main').data('page').split('page-').join('');
				settings.page = page;
				$('body').attr('data-page', page);
				
				if(settings.prevPage == 'home') {
					$('body').addClass('animating-home');
				}
				
			});
			
			Barba.Dispatcher.on('transitionCompleted', function() {
				initializeBarbaModules();
				
				if($('body').hasClass('page-project')) {
					$('.waiting').show();
				}
				
				if(!$('body').hasClass('page-project')){
					//$('.waiting').show();
					setTimeout(function(){
						$('.waiting').hide();
					}, 1000);
				}
				
				if(settings.page == 'about') settings.animating = false;
			});
		}
		
		function winMouseMove(e) {
			//console.log('mousemove')
			var _left = e.clientX,
				_top  = e.pageY;
				
				$cursor.css('left', _left).css('top', _top);
		}
		
		function winResize(){
			
			$('*').addClass('no-trans');
			
			clearTimeout(removeTransition);
			
			removeTransition = setTimeout(function(){
				$('*').removeClass('no-trans');
			}, 300);
			
			if( $window.height() * 1.5 < $window.width() ) {
				$('body').addClass('landscape-format');
			} else {
				$('body').removeClass('landscape-format')
			}
				
		}
		
};
  