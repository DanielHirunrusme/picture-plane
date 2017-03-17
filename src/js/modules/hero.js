var settings = require( "modules/settings" ),
	mousewheel = require( "jquery-mousewheel" )($)


var hero = module.exports = {

		currImage: 0,
		totalImages: $('#hero').find('li').length - 1,
		speed: 4000,
		slideInt: false,
		loaded: false,
		timer: false,
		
		init: function(){
			hero.preloadImages();
			//$(window).on('mousewheel', hero.heroScroll);
			//$('#projects-container').on('scroll mousewheel', hero.heroScroll);
			$('#hero').on('click', hero.heroClick);
			hero.setHeight();
		},
		
		setHeight: function(){
			$('#hero').css('height', Math.round( $(window).width() * .5333 ) );
		},
		
		heroScroll: function(){
			if($('#projects-container').scrollTop() > $('#hero').height()) {
				$('body').addClass('hide-hero');
				//$(window).off('mousewheel', hero.heroScroll);
				$('#projects-container').off('scroll mousewheel', hero.heroScroll);
				$('#projects-container').scrollTop(0)
				hero.stopSlideshow();
			}
		},
		
		heroClick: function(){
			if($('body').hasClass('menu-open')) {
				$('body').removeClass('menu-open')
			} else {
				if(hero.loaded) hero.nextImage();
			}
		},
		
		deactivate: function(){
			$('hero').addClass('deactivate');
		},
		
		activate: function(){
			$('hero').removeClass('deactivate');
		},
		
		preloadImages: function(){
			var preload = [];
			
			$('#hero').find('img').each(function(){
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
			  	hero.startSlideshow();
			});
		},
		
		startSlideshow: function(){
			hero.loaded = true;
			console.log('%c [startSlideshow]', 'color:blue');
			$('#hero').find('li').eq(hero.currImage).addClass('active');
			//hero.slideInt = setInterval( hero.nextImage, hero.speed )
			hero.timer = setTimeout(function(){ hero.nextImage() }, hero.speed);
		},
		
		stopSlideshow: function(){
			clearTimeout(hero.timer);
			$('#hero').remove();
		},
		
		nextImage: function(){
			clearTimeout(hero.timer);
			hero.currImage = hero.currImage < hero.totalImages ? hero.currImage+1 : 0;
			$('#hero').find('li').removeClass('active').addClass('inactive');
			$('#hero').find('li').eq(hero.currImage).removeClass('inactive');
			$('#hero').find('li').eq(hero.currImage).addClass('active');
			hero.timer = setTimeout(function(){ hero.nextImage() }, hero.speed);
			console.log('%c [nextHeroImage]', 'color:blue')
		}
};
  