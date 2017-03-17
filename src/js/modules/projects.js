var settings = require( "modules/settings" ),
	masonry = require( "masonry-layout" ),
	hero = require( "modules/hero" );




var projects = module.exports = {
	
		animGalleryInt: false,
		animGalleryTimer: false,
		masonry_obj: false,
		
		init: function(){
			
			$('.showcase-link').on('click', projects.projectClick);
			projects.sizeGallery();
			projects.preloadImages();
			$('#projects-container').on('scroll', projects.projectsScroll);
			//$(window).on('resize', )
		},
		
		
		projectsScroll: function(){
			console.log('scrolling projects scroll ' + $('#projects-container').scrollTop())
			if($('#projects-container').scrollTop() >= $('#projects-container')[0].scrollHeight - $(window).height() - $(window).height()/2) {
				$('footer').addClass('show');
			} else {
				$('footer').removeClass('show');
			}
		},
		
		sizeGallery: function(){
			$('.showcase-item.full').each(function(){
				var calc_h = ($(window).width()/2)/$(this).data('w') * $(this).data('h');
				//$(this).css('height', Math.round(calc_h));
			});
			
			
			masonry_obj = $('.showcase').masonry({
			  itemSelector: '.showcase-item',
			  columnWidth: function( containerWidth ) {
			  	return containerWidth /2; // depends how many boxes per row
			  }(), 
  	          isAnimated: true,
			  percentPosition: true
			});
			
			
			masonry_obj.imagesLoaded().progress( function(imgLoad, image) {
				//console.log(e)
				var $item = $( image.img ).parent().parent()
				$item.addClass('loaded');
			  masonry_obj.masonry('layout');
			});
			
			
			$('.showcase').on(
			    "transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd",
			    function() {
			        console.log('animating')
			    }
			);
			
			
			if ($('.showcase').is(':animated')) {
			    console.log('animating')
			}
			
		},
		
		animateGallery: function(){
			console.log('%c [animateGallery]', 'color:blue')
			
			
			//$('#projects-grid').animate({ scrollTop:0 }, 200);
		
			
			
			
			clearTimeout(projects.animGalleryTimer)
			projects.animGalleryInt = setInterval(function(){ masonry_obj.masonry('layout') }, 10);
			projects.animGalleryTimer = setTimeout(function(){
				clearInterval(projects.animGalleryInt)
			}, 300);
		},
		
		preloadImages: function(){
			var preload = [];
			
			$('.showcase-image').each(function(){
				preload.push($(this).attr('src'));
			});
			
			var promises = [];
			for (var i = 0; i < preload.length; i++) {
			    (function(url, promise) {
			        var img = new Image();
			        img.onload = function() {
			          promise.resolve();
			        };
			        img.src = url;
			    })(preload[i], promises[i] = $.Deferred());
			}
			$.when.apply($, promises).done(function() {
			  //alert("All images ready sir!");
			});
		},
		
		projectClick: function(e){
			var $item = $(e.currentTarget);
			var id = $item.parent().index();
			settings.currentProject = id;
			
			if(!$('body').hasClass('menu-open')){
				if(!$item.hasClass('is-active')){
					$('.showcase-link').removeClass('is-active locked');
					$item.addClass('is-active locked');
					$('body').addClass('project-opening');
				} else {
					
					projects.deactivate();
					projects.showProject();
					return false;
				}
			} else {
				projects.animateGallery();
				$('body').removeClass('menu-open');
				return false;
			}
			
			
			console.log(settings.currentProject)
		},
		
		deactivate: function(){
			hero.deactivate();
			$('body').addClass('project-open');
			$('.showcase-item').addClass('deactivate');
		},
		
		activate :function(){
			//$('body').removeClass('project-open');
			hero.activate();
			$('.showcase-item').removeClass('deactivate');
			$('.showcase-link').removeClass('locked is-active');
			//$('.showcase-link').removeClass('is-active');
		},
		
		hideProject: function(){
			$('body').addClass('hide-project');
			$('body').removeClass('show-project');
		},
		
		showProject: function(){
			$('body').addClass('show-project');
			$('body').removeClass('hide-project');
		},
		
		remove: function(){
			
			$('body').removeClass('project-opening project-open hide-project project-in');
		},
		
		projectOpenEvents: function(){
			projects.projectRemoveEvents();
			console.log('create events')
			$('#projects-container').on('mouseover', projects.gridOver).on('mouseout', projects.gridOut).on('click', projects.gridClick);
		},
		
		projectRemoveEvents:function(){
			projects.gridOut();
			$('#projects-container').off('mouseover');
			$('#projects-container').off('mouseout');
			$('#projects-container').off('click');
		},
		
		gridOver: function (){
			console.log('over')
			$('body').addClass('grid-over');
		},
		
		gridOut: function(){
			$('body').removeClass('grid-over');
		},
		
		gridClick: function(){
			console.log('click')
			//projects.gridOut();
			projects.projectRemoveEvents();
			//settings.page = 'home';
			Barba.Pjax.goTo(settings.url);
			
		},
		
		resize: function(){
			$('#projects-grid').addClass('no-trans');
			$('#projects-grid').css('margin-bottom', $('.footer').outerHeight()).css('top', $('#hero').height())
			clearTimeout($.data(this, 'scrollTimer'));
		    $.data(this, 'scrollTimer', setTimeout(function() {
		       $('#projects-grid').removeClass('no-trans');
		    }, 250));
		}
		
		

	
};
  