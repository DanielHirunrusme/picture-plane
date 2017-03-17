var settings = require( "modules/settings" ),
	mousewheel = require("jquery-mousewheel")($),
	projects = require("modules/projects")


module.exports = function( el ) {
		var $el = $( el ),
		$window = $( window ),
		totalImages = $(el).find('figure').length,
		$wrapper = $('.main-project'),
		currImage = 0,
		spacing = !settings.mobile ? 80 : 40,
		offset = !settings.mobile ? 120 : 60,
		clicked = false,
		projectType = $el.data('project-type');
		
		init();
		winResize();
		
		function init(){
			console.log('init')
			$window.on('resize', winResize);
			$wrapper.off('mousewheel').on('mousewheel', wrapperWheel).on('scroll', wrapperScroll);
			$('figure').on('click', figureClick).on('mouseover mousemove', figureOver)
		    
			if(projectType != 'video') {
				preloadImages();
			} else {
				sizeVideo();
			}
			if(!settings.init){
				setTimeout(function(){
					projects.projectOpenEvents();
				}, 500)
				
			} else {
				projects.projectOpenEvents();
			}
			//console.log(totalImages);
		}
		
		function figureOver(e) {
			if(e.clientX < $window.width()/2) {
				$('figure').addClass('prev').removeClass('next');
			} else {
				$('figure').removeClass('prev').addClass('next');
			}
		}
		
		function preloadImages(){
			
			var preload = [];
			
			$('figure').find('img').each(function(){
				preload.push($(this).attr('src'));
			})
			
			var promises = [];
			for (var i = 0; i < preload.length; i++) {
			    (function(url, promise) {
			        var img = new Image();
			        img.onload = function() {
						sizeGallery();
			          promise.resolve();
			        };
			        img.src = url;
			    })(preload[i], promises[i] = $.Deferred());
			}
			$.when.apply($, promises).done(function() {
				console.log('%c [preloadImages]: Completed', 'color:green')
				sizeGallery();
			});
		}
		
		function wrapperWheel(e){
			if(clicked) return false;
			var sl = $wrapper.scrollLeft() - e.deltaY;
			//console.log(sl)
			$wrapper.scrollLeft(sl);
			
			$el.find('figure').each(function(){
				if($wrapper.scrollLeft() > $(this).position().left - $window.width()/2 ) {
					currImage = $(this).index();
				}
			});
			
			setContainerPos()
			
		}
		
		function wrapperScroll(){
			if(clicked) return false;
			$el.find('figure').each(function(){
				if($wrapper.scrollLeft() > $(this).position().left - $window.width()/2 ) {
					currImage = $(this).index();
				}
			});
			
			setContainerPos()
		}
		
		function setContainerPos(){
			console.log('detect container pos')
			if(currImage != 0) $('body').addClass('project-in')
			else $('body').removeClass('project-in');
		}
		
		
		function figureClick(e) {
			var item = $(e.currentTarget);
			if($(this).index() == currImage) {
				//clicked image in view
				if(e.clientX > $window.width()/2) {
					currImage = item.index() + 1;
				} else {
					currImage = item.index() - 1;
				}
				
				
			} else {
				currImage = item.index();
			}
			
			if(currImage == -1) {
				$('#barba-wrapper').addClass('bounce');
				setTimeout(function(){ $('#barba-wrapper').removeClass('bounce'); }, 500)
			} 
			
			if(currImage == totalImages || currImage < 0) currImage = 0;
			
			
			
			if(currImage != 0) $('body').addClass('project-in')
			else $('body').removeClass('project-in');
			
			nextImage();
		}
		
		function nextImage(){
			var sl = $('figure').eq(currImage).position().left - $window.width()/2 + $('figure').eq(currImage).width()/2;
			clicked = true;
			setCaption();
			$wrapper.stop().animate({scrollLeft: sl }, 200);
			setTimeout(function(){ clicked = false }, 200);
		}
		
		function setCaption(){
			if($('figure').eq(currImage).data('caption') != ''){
				$('.project-description h2').text( $('figure').eq(currImage).data('caption') )
				$('.project-description h3').text('')
			} else {
				$('.project-description h2').text( $('.main-project').data('title') )
				$('.project-description h3').text( $('.main-project').data('subtitle') )
			}
		}
		
		function sizeGallery(){
			
			var _totalWidth = 0;
			
			/*
			* Step one: size all images
			*/
			$('.project-image[data-orientation="landscape"]').each(function(){
				var calc_w = Math.round( $window.height()*.8/$(this).data('h') * $(this).data('w') );
				console.log(calc_w)
				if(calc_w > $window.width() - offset){
					$(this).addClass('smaller-landscape').css('width', ($window.width() - offset) + 'px')
				} else {
					$(this).css('width', '').removeClass('smaller-landscape');
				}
			});
			
			$('.project-image[data-orientation="portrait"]').each(function(){
				var calc_w = Math.round( $window.height()*.8/$(this).data('h') * $(this).data('w') );
				console.log(calc_w)
				if(calc_w > $window.width() - offset ){
					$(this).addClass('smaller-landscape').css('width', ($window.width() - offset ) + 'px')
				} else {
					$(this).css('width', '').removeClass('smaller-landscape');
				}
			});
			
			$('.project-image[data-orientation="square"]').each(function(){
				var calc_w = Math.round( $window.height()*.8/$(this).data('h') * $(this).data('w') );
				console.log(calc_w)
				if(calc_w > $window.width() - offset ){
					$(this).addClass('smaller-landscape').css('width', ($window.width() - offset ) + 'px')
				} else {
					$(this).css('width', '').removeClass('smaller-landscape');
				}
			});
			
			$('figure').each(function(){
				$(this).css('width', $(this).find('img').width());
			});
			
			/*
			* Step two: position images
			*/
			var _l = $window.width()/2 - $(el).find('figure').eq(0).find('img').width()/2 - 10;
			$(el).find('figure').eq(0).css('left', _l).addClass('show');
			
			_totalWidth = _l;
			
			for(var i=1; i<totalImages; i++) {
		
				var _l = $(el).find('figure').eq(i-1).position().left + $(el).find('figure').eq(i-1).outerWidth();
				$(el).find('figure').eq(i).css('left', _l + spacing).addClass('show');
				
				_totalWidth += $(el).find('figure').eq(i).outerWidth() + spacing;
			}
			
			
			/*
			* Step three: size scrolling container
			*/
			_totalWidth += $window.width()/2 - $(el).find('figure').last().outerWidth()/2 - 50;
			var _mr = $window.width()/2 - $('.project-figure:last-child').width()/2;
			$el.find('.project-figure:last-child').css('padding-right', _mr)
			//$('.project-images').css('width', _totalWidth);
			
			/*
			var _l = $window.width()/2 - $(el).find('figure').eq(0).find('img').width()/2;
			
			$(el).find('figure').eq(0).css('left', _l).css('width', $(el).find('figure').eq(0).find('img').width());
			
			var _totalWidth =  0;
			
			for(var i=1; i<totalImages; i++) {
				var _l = $(el).find('figure').eq(i-1).position().left + $(el).find('figure').eq(i-1).width();
				$(el).find('figure').eq(i).css('left', _l + 60).css('width', $(el).find('figure').eq(i).find('img').width());
				
				_totalWidth +=  _l + 60 + $(el).find('figure').width();
			}
			
			$('.project-images').css('width', (_totalWidth + $window.width()/2 - $(el).find('figure').last().width()/2) + 'px');
			*/
		}
		
		function sizeVideo(){
			if($('.kirby-plugin-oembed--video').length > 0) {
				var _w, _h, _l;
				
				if($('body').attr('data-device') != 'mobile'){
					_w = $window.height() * 1.5;
					_h = $window.height() - 260;
					if(_w > $window.width() - 260) {
						_w = $window.width() - 260;
						_h = $window.width() * .45;
					}
					_t = _h/2 + 40;
					_l = $window.width()/2 - _w/2 - 120;
				} else {
					console.log('size for mobile')
					if( $window.width() <  $window.height() ) {
						_w = $window.width() - 100;
						_h = $window.width() * .45;
						_l = $window.width()/2 - _w/2 - 100;
					} else {
						_w = $window.width() - 240;
						_h = $window.height() - 180;
						_l = $window.width()/2 - _w/2 - 140;
					}
					
					_t = _h/2 + 40;
					
				}
				
				$('.kirby-plugin-oembed--video').css('height', _h).css('width',  _w).css('margin-top', -_t).css('left', _l).show();
			}
		}
		
		function winResize(){
			console.log(projectType)
			if(projectType != 'video'){
				sizeGallery();
				var sl = $('figure').eq(currImage).position().left - $window.width()/2 + $('figure').eq(currImage).width()/2 + 10;
				$wrapper.scrollLeft(sl);
			} else {
				sizeVideo();
			}
			
			
		}
		
};
  