var settings = require( "modules/settings" ),
	projects = require( "modules/projects" ),
	barba = require("barba.js");


module.exports = function( el ) {
		var $el = $( el ),
		$window = $( window ),
		$btn = $('#menu-toggle');
		
		init();
		winResize();
		
		function init(){
			console.log('menu')
			//$btn.on('click', toggleMenu);
			$('.hamburger').on('click', hamburgerClick)
			$('.close').on('mouseover', closeOver).on('mouseout', closeOut).on('click touchend', closeClick);
			//$('.menu-item a').on('click', menuClick);
			$('.logo').on('vclick click', logoClick).on('mouseover', logoOver).on('mouseout', logoOut);
		}
		
		function toggleMenu(e){
			e.stopPropagation();
			if(!$('body').hasClass('show-project')){
				if(settings.page != 'default') {
					//Barba.Pjax.goTo($('.menu-item').eq(0).find('a').attr('href'));
					$('.menu-item').eq(0).addClass('is-active');
				}
				//$('body').toggleClass('menu-open');
			} else {
				Barba.Pjax.goTo(settings.url);
				//projects.activate();
				//projects.hideProject();
				//$('body').removeClass('menu-open');
			}
			
		}
		
		function hamburgerClick(e){
			if(settings.animating) return false;
			e.preventDefault();
			settings.animating = true;
			console.log('hamburger click')
			$('body').addClass('menu-open');
			$('#projects-grid').scrollTop(0);
			projects.animateGallery();
			Barba.Pjax.goTo(settings.url + 'studio');
			setTimeout(function(){  settings.animating = false; }, 500);
			//return false;
		}
		
		function closeClick(e){
			if(settings.animating) return false;
			
			e.preventDefault();
			//settings.animating = true;
			Barba.Pjax.goTo(settings.url);
			console.log('close clicked')
			$('body').removeClass('menu-open');
			//$('#projects-grid').scrollTop(0);
			projects.animateGallery();
			
			setTimeout(function(){  settings.animating = false; }, 500);
			return false;
		}
		
		function closeOver(){
			if($('body').hasClass('show-project')) {
				projects.gridOver();
				$('body').addClass('show-full-logo');
			} 
		}
		
		function closeOut(){
			if($('body').hasClass('show-project')) {
				projects.gridOut();
				$('body').removeClass('show-full-logo');
			} 
		}
		
		function logoClick(e){
			e.stopPropagation();
			if($('body').hasClass('show-project')) {
				e.preventDefault();
				Barba.Pjax.goTo(settings.url);
				projects.projectRemoveEvents();
				$('body').removeClass('show-full-logo');
			} 
			projects.animateGallery();
			if(settings.page == 'default' || settings.page == 'home') {
				$('#projects-grid').stop().animate({scrollTop:0}, 200)
			}
			if(settings.page == 'default') {
				e.preventDefault();
				Barba.Pjax.goTo(settings.url);
			}
			if(settings.page == 'home') {
				
				return false;
			}
			/*
			if($('body').hasClass('menu-open')) {
				$('body').removeClass('menu-open');
			} else if($('body').hasClass('project-open')) {
				projects.activate();
				projects.hideProject();
			} else {
				
			}
			
			return false;
			*/
		}
		
		function logoOver(){
			if($('body').hasClass('show-project')) projects.gridOver();
		}
		
		function logoOut(){
			if($('body').hasClass('show-project')) projects.gridOut();
		}
		
		/*
		function menuClick(e){
			var item = $(e.currentTarget).parent();
			$('.menu-item').removeClass('is-active');
			$(item).addClass('is-active');
		}
		*/
		
		function winResize(){
			
				
		}
		
};
  