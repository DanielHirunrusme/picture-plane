var settings = require( "modules/settings" ),
barba = require("barba.js"),
projects = require( "modules/projects" ),
notification = require( "modules/notification" ),
hero = require( "modules/hero" )


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
		$wrapper = $('#barba-wrapper');
		
		init();
		winResize();
		
		function init(){
			$window.on('resize', winResize);
			$wrapper.removeClass('no-trans');
			if($('body').data('device') == 'mobile') settings.mobile = true;
			projects.init();
			hero.init();
			notification.init();
			initBarba();
			
			setTimeout(function(){
				settings.init = false;
			}, 500); 
		}
		
		
		function initBarba(){
			
			Barba.Pjax.start();
			
			Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
			
				
			});
			
			Barba.Pjax.getTransition = function() {
			  return HideShowTransition;
			};
			
			var HideShowTransition = Barba.BaseTransition.extend({
			  start: function() {
			    /**
			     * This function is automatically called as soon the Transition starts
			     * this.newContainerLoading is a Promise for the loading of the new container
			     * (Barba.js also comes with an handy Promise polyfill!)
			     */

			    // As soon the loading is finished and the old page is faded out, let's fade the new page
			    Promise
			      .all([this.newContainerLoading, this.slideOut()])
			      .then(this.slideIn.bind(this));
			  },

			  slideOut: function() {
			    /**
			     * this.oldContainer is the HTMLElement of the old Container
			     */
				
			    return true;
			  },

			  slideIn: function() {
			    /**
			     * this.newContainer is the HTMLElement of the new Container
			     * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
			     * Please note, newContainer is available just after newContainerLoading is resolved!
			     */
				
			    var _this = this;
			    var $el = $(this.newContainer);
				var $old =  $(this.oldContainer);
				console.log($el.find('main').data('page'));
			
				switch($el.find('main').data('page')){
					case "project":
						initializeBarbaModules();
						 _this.done();
						projects.showProject();
						projects.deactivate();
						settings.page = 'project';
						$el.show();
						$old.hide();
						$('body').removeClass('show-full-logo');
					break;
					
					case "home":
						
						$old.show();
						$('body').removeClass('menu-open');
					    $el.css({
					      visibility : 'visible',
					      opacity : 0
					    });
						$('body').removeClass('show-full-logo');
						
						projects.projectRemoveEvents()
						if(settings.page == 'project') {
							$el.hide();
							projects.hideProject();
							setTimeout(function(){
								$(this.oldContainer).hide();
								$('body').removeClass('project-opening');
								projects.remove();
								_this.done();
							}, 500);
						} else {
							setTimeout(function(){
								$(this.oldContainer).hide();
								//$('body').removeClass('project-opening');
								projects.remove();
								_this.done();
							}, 500);
						}
						
						
						projects.activate();
						settings.page = 'home';
					break;
					
					
					
					default:
						$('body').addClass('menu-open');
						$el.show();
						$old.hide();
						settings.page = 'default';
						$('body').removeClass('project-opening');
						console.log('clicked hamburger from projects')
						projects.remove();
						projects.activate();
						_this.done();
						if($('.main').hasClass('contact-main')){
							initializeBarbaModules();
						}
					break;
				}
				
				
				projects.animateGallery();

			   
				
			    
			   
			  }
			});
			
			Barba.Dispatcher.on('transitionCompleted', function() {
				if($('.main').data('page') == 'project' ){
					//projects.deactivate();
				} else {
					//projects.activate();
				}
			});
			
		}
		
		window.initMap = function(){
			console.log('loaded')
		}
		
		function winMouseMove(e) {
			
		}
		
		function winResize(){
			hero.setHeight();
			projects.resize();
				
		}
		
};
  